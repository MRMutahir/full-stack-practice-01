const redisConnectionOptions = {
    host: process.env.REDIS_HOST,
    port: 6379
};
const defaultQueueOptions = {
    removeOnComplete: {
        count: 20,
        age: 60 * 60
    },
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 1000
    }
};
export { redisConnectionOptions, defaultQueueOptions };
