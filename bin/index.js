#!/usr/bin/env node
import { bin } from "../lib/index.js";

process.exitCode = await bin(process.argv.slice(2));
