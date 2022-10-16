module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: 'standard',
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'no-console': 1,
		indent: [ 2, 'tab' ],
		'no-tabs': 0,
		semi: [ 'error', 'always' ],
		'keyword-spacing': [ 'error', { before: true } ],
		'object-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'no-param-reassign': [
			'error',
			{
				props: false
			}
		],
		'no-use-before-define': [
			'error',
			{
				functions: false
			}
		]
	}
};
