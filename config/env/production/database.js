const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        schema: env("DATABASE_SCHEMA", "public"), // Not required
        ssl: {
          ca: env("DATABASE_CA"),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 5), max: env.int('DATABASE_POOL_MAX', 100) },
    },
  
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
