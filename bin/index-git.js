import { execa } from "execa";

const args = process.argv.slice(2);

execa("git", args, { stdio: "inherit" });
