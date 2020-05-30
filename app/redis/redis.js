const Redis = require('ioredis')
const col = require('chalk')

module.exports = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASSWORD,
	keepAlive: true,
	showFriendlyErrorStack: true,
})
	.on('connect', () =>
		console.log(
			col.bold.greenBright(
				'redis connected as ' + process.env.MODE + ' mode.'
			) +
				'\n' +
				col.bgGreen('REDIS SERVER:>>') +
				' ' +
				col.bold.gray.dim(
					process.env.REDIS_HOST + ':' + process.env.REDIS_PORT
				)
		)
	)
	.on('ready', () => console.log('redis is ready'))
	.on('reconnecting', () =>
		console.log('redis is reconnecting')
	)
