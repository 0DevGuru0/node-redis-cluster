var Redis = require('ioredis')

let cluster = new Redis.Cluster([
	{
		host: process.env.REDIS_CLUSTER_HOST,
		port: process.env.REDIS_CLUSTER_PORT,
	},
])

cluster.connect(() =>
	console.log('redis cluster connected')
)

cluster.set('foo', 'bar')
cluster.get('foo', function (err, res) {
	console.log(err, res)
})
