import { describe, expect, it, vi } from "vitest";

import { getIPs } from "./shared.js";

describe("shared", () => {
	it("get ip", async () => {
		const ips = await getIPs("github.global.ssl.fastly.net");

		expect(ips).not.toHaveLength(0);
	});
});
