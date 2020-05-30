console.clear()
require('dotenv').config()

const redis =
	process.env.MODE === 'production'
		? require('./redis/redisCluster')
		: require('./redis/redis')

for (let i = 0; i < 17; i++) {
	redis.set('ali' + i, 'ok' + i)
}

redis.monitor(function (err, monitor) {
	monitor.on('monitor', function (time, args, source) {
		console.log(time, args, source)
	})
})

// var stream = redis.scanStream({
// 	match: 'ali*',
// 	count: 1,
// })

// stream.on('data', resultKeys => console.log(resultKeys))
// stream.on('end', () =>
// 	console.log('all keys have been visited')
// )
// ///////////////////////////////////////////////////////////
