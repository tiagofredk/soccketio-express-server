const redis = require('redis');

const client = redis.createClient({
    // port: 6379,
    // host: 'localhost'
    // url: 'redis-14049.c55.eu-central-1-1.ec2.cloud.redislabs.com:14049',
    // port: 14049,
    socket: {
        host: 'redis-14049.c55.eu-central-1-1.ec2.cloud.redislabs.com',
        port: '14049'
    },
    password: 'T625qmvVjmDZrLlUNqaVH7tBZSybWgG8'
});

client.on('error', async (err) => {
    // await client.connect();
    
    // await client.set('foo', 'bar');

    console.log('Redis Client Error', err)
});


module.exports = client;