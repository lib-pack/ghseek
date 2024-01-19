/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
	env: {
		es2022: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:eslint-comments/recommended",
		"plugin:n/recommended",
		"plugin:vitest/recommended",
	],
	ignorePatterns: ["!.*", "coverage", "lib", "node_modules", "pnpm-lock.yaml"],
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/stylistic",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			rules: {
				// These off-by-default rules work well for this repo and we like them on.
				"logical-assignment-operators": [
					"error",
					"always",
					{ enforceForIfStatements: true },
				],
				"operator-assignment": "error",
			},
		},
		{
			files: "**/*.md/*.ts",
			rules: {
				"n/no-missing-import": ["error", { allowModules: ["ghseek"] }],
			},
		},
		{
			extends: [
				"plugin:@typescript-eslint/recommended-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked",
			],
			files: ["**/*.ts"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.eslint.json",
			},
		},

		{
			files: "**/*.test.ts",
			rules: {
				// These on-by-default rules aren't useful in test files.
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
			},
		},
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "no-only-tests", "vitest"],
	reportUnusedDisableDirectives: true,
	root: true,
	rules: {
		// These off/less-strict-by-default rules work well for this repo and we like them on.
		"@typescript-eslint/no-unused-vars": ["error", { caughtErrors: "all" }],
		"no-only-tests/no-only-tests": "error",

		// These on-by-default rules don't work well for this repo and we like them off.
		"no-case-declarations": "off",
		"no-constant-condition": "off",
		"no-inner-declarations": "off",
		"no-mixed-spaces-and-tabs": "off",

		// Stylistic concerns that don't interfere with Prettier
		"@typescript-eslint/padding-line-between-statements": [
			"error",
			{ blankLine: "always", next: "*", prev: "block-like" },
		],
		"no-useless-rename": "error",
		"object-shorthand": "error",
	},
};
