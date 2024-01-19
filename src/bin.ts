import { Command } from "commander";
import { execa } from "execa";
import GitUrlParse from "git-url-parse";
import chalk from "chalk";
import sudo from "sudo-prompt";
import got from "got";
import ping from "ping";
import throat from "throat";
import { resolve, join } from "path";
import { writeFileSync, existsSync, readFileSync, rmSync } from "fs";
import { getIPs } from "./shared.js";
import domain from "./domain.js";

const cwd = process.cwd();

const program = new Command();

const throatFn = throat as any;

export async function bin(argv: string[] = process.argv) {
	program
		.command("clone <source> [destination]")
		.description("clone a repository into a newly created directory")
		.action(async (source: string, destination?: string) => {
			const gitUrl = GitUrlParse(source);
			// source = `https://gitclone.com/${gitUrl.source}/${gitUrl.owner}/${gitUrl.name}`;
			source = `https://hub.fgit.cf/${gitUrl.owner}/${gitUrl.name}`;
			console.log(chalk.blue("clone"), source);

			await execa(
				"git",
				["clone", source, destination].filter((n) => n) as string[],
				{
					stdio: "inherit",
				},
			);
		});

	program
		.command("down <url> [destination]")
		.description("down github release、raw file")
		.action(async (url: string, destination?: string) => {
			const gitUrl = GitUrlParse(url);
			destination ||= gitUrl.name;
			const isRaw = url.includes("raw.githubusercontent.com");
			const downUrl = isRaw
				? url.replace("raw.githubusercontent.com", "raw.gitmirror.com")
				: `https://gh.api.99988866.xyz/${url}`;
			console.log(chalk.blue("down:"), downUrl);
			console.log(chalk.blue("destination:"), resolve(destination));
			if (existsSync(destination)) {
				console.error(
					chalk.red("destination is exists: " + resolve(destination)),
				);
				return;
			}

			if (isRaw) {
				const res = await got.get(downUrl).buffer();
				writeFileSync(destination, res);
			} else {
				await execa("wget", ["-c", downUrl, "-O", destination], {
					stdio: "inherit",
				});
			}
		});

	program
		.command("seek [hosts_path]")
		.description(
			"Update the local hosts file (/etc/hosts) to speed up access to github.",
		)
		.action(async (hosts_path: string = resolve("/etc/hosts")) => {
			console.log(chalk.blue(`start seek github update hosts ${hosts_path}`));

			const hostsBlocks: any[] = await Promise.all(
				domain.map(throatFn(3, (domain: string) => findDomainInfo(domain))),
			);

			const githubHosts = `# ghseek github\n${hostsBlocks
				.filter((block) => block.preIp)
				.map((block: any) => `${block.preIp} ${block.domain}`)
				.join("\n")}\n# ghseek end\n`;
			let hosts = readFileSync(hosts_path, "utf-8");
			if (hosts.includes("# ghseek github")) {
				console.log(chalk.blue(`\nupdate hosts ${hosts_path}\n`));
				hosts = hosts.replace(
					/# ghseek github[\s\S]*# ghseek end/,
					githubHosts,
				);
			} else {
				console.log(chalk.blue(`\nappend hosts ${hosts_path}\n`));
				hosts += "\n" + githubHosts;
			}

			console.log(githubHosts);
			const hostsBk = join(cwd, "hosts.bk");
			writeFileSync(hostsBk, hosts);
			console.log(
				chalk.blue(
					`\nAuthorization to modify the hosts file ${hosts_path},please enter your password.`,
				),
			);

			await new Promise<void>((resolve, reject) =>
				sudo.exec(
					'cat "' + hostsBk + '" > ' + hosts_path,
					{
						name: "ghseek",
					},
					(error, stdout, stderr) => {
						if (error) {
							console.error(
								chalk.red(
									'Authorization to modify the hosts file failed, please try again with "sudo"',
								),
							);
							reject(error);
							return;
						}

						resolve();
					},
				),
			);
			console.log(
				"\n" + "Exec " + chalk.blue(`\`cat ${hosts_path}\``) + ` view result.`,
			);

			rmSync(hostsBk);
		});

	program
		.command("version")
		.alias("v")
		.action(() => {
			const { version } = JSON.parse(
				readFileSync(
					join(process.argv[1], "..", "..", "package.json"),
					"utf-8",
				),
			);
			console.log("\n" + chalk.green("v" + version));
		});

	// 通过独立的的可执行文件实现命令 (注意这里指令描述是作为`.command`的第二个参数)
	// 返回最顶层的命令以供继续添加子命令
	program.command("git [command]", "git command (eg: git clone)").alias("g");

	await program.parseAsync(argv);
	console.log("\n", chalk.green("done"), program.args[0], "command.");
	return 0;
}

async function findDomainInfo(domain: string) {
	const logs = [["\n" + chalk.blue(`${domain}:`)]];

	const ips = await getIPs(domain);
	let preArg = Number.MAX_SAFE_INTEGER;
	let preIp = "";
	for (let i = 0; i < ips.length; i++) {
		const ip = ips[i];
		const net = await ping.promise.probe(ip, { min_reply: 3 });
		logs.push([chalk.blue("-"), chalk.cyan(ip), chalk.yellow(net.avg + "ms")]);
		if (Number(net.avg) < preArg) {
			preIp = ip;
			preArg = Number(net.avg);
		}
	}

	logs.push([
		chalk.blue(">"),
		chalk.blue("preferred:"),
		chalk.cyan(preIp),
		chalk.yellow(preArg + "ms"),
	]);

	console.log(logs.map((log) => log.join(" ")).join("\n"));

	return {
		preIp,
		preArg,
		domain,
	};
}
