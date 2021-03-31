module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:prettier/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"google",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		sourceType: "module",
		tsconfigRootDir: __dirname,
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
	],
	plugins: ["@typescript-eslint", "import", "prettier"],
	rules: {
		"linebreak-style": 0,
		"quote-props": 0,
		"no-unused-vars": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"object-curly-spacing": [2, "always"],
		quotes: [2, "double", { avoidEscape: false }],
		indent: ["error", "tab"],
		"no-tabs": 0,
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				useTabs: true,
			},
		],
	},
};
