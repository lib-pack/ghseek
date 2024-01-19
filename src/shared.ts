import Crawler from "crawler";

export function getIPs(domain: string): Promise<string[]> {
	return new Promise((resolve, reject) => {
		// https://sites.ipaddress.com/github.global.ssl.fastly.net
		const c = new Crawler({
			maxConnections: 10,
			// This will be called for each crawled page
			callback: (error, res, done) => {
				if (error) {
					console.log(error);
					reject(error);
				} else {
					const $ = res.$;
					// $ is Cheerio by default
					//a lean implementation of core jQuery designed specifically for the server
					resolve(
						$("#tabpanel-dns-a a")
							.map((i, el) => $(el).text())
							.get(),
					);
				}

				done();
			},
		});

		c.queue(`https://sites.ipaddress.com/${domain}`);
	});
}
