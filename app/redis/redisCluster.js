var Redis = require('ioredis')
const col = require('chalk')
const {
	REDIS_CLUSTER_HOST,
	REDIS_CLUSTER_PORT,
	MODE,
} = process.env
module.exports = new Redis.Cluster([
	{
		host: REDIS_CLUSTER_HOST,
		port: REDIS_CLUSTER_PORT,
	},
])
	.on('connect', () =>
		console.log(
			col.bold.greenBright(
				'redis connected as ' + MODE + ' mode.'
			) +
				'\n' +
				col.bgGreen('REDIS SERVER:>>') +
				' ' +
				col.bold.gray.dim(
					REDIS_CLUSTER_HOST + ':' + REDIS_CLUSTER_PORT
				)
		)
	)
	.on('ready', () => console.log('redisCluster is ready'))
	.on('reconnecting', () =>
		console.log('redisCluster is reconnecting')
	)
