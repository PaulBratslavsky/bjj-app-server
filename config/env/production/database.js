const parse = require('pg-connection-string').parse;

const { host, port, database, user, password } = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        host,
        port,
        database,
        user,
        password,
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
