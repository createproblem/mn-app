'use strict';

module.exports = function(env) {
  return {
    database: {
      dsn: env.DATABASE_DSN
    },
    passport: {
      github: {
        clientID: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET
      }
    },
    api: {
      tmdb: {
        apiKey: env.API_TMDB_API_KEY
      }
    },
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD
    }
  };
};
