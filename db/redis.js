const redis = require('redis');

const client = redis.createClient({
    // port: 6379,
    // host: 'localhost'
    host : 'redis-14049.c55.eu-central-1-1.ec2.cloud.redislabs.com',
    port : 14049,
    password: 'T625qmvVjmDZrLlUNqaVH7tBZSybWgG8'
});

// client.on("error", function (err) {
//     throw err;
// });

// client.set('foo', 'bar');

module.exports = client;