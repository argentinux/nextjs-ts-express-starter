const pkg = require('./package.json')

module.exports = {
  presets: [
    'next/babel',
    '@babel/preset-typescript',
		'@babel/preset-env',
	],
}
