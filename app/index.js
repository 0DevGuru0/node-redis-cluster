var Redis = require('ioredis')

let cluster = new Redis.Cluster([
	{
		host: process.env.REDIS_CLUSTER_HOST,
		port: process.env.REDIS_CLUSTER_PORT,
	},
])
console.log(cluster.info())
for (let i = 0; i < 1000; i++) {
	cluster.set('foo' + i, 'bar' + i)
}
cluster.get('foo', function (err, res) {
	console.log(res)
})
