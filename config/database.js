const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  if(env('NODE_ENV') === 'production'){
    const config = parse(process.env.DATABASE_URL);

    return {
      defaultConnection: 'default',
      connections: {
        default: {
          connector: 'bookshelf',
          settings: {
            client: 'postgres',
            host: config.host,
            port: config.port,
            database: config.database,
            username: config.user,
            password: config.password,
          },
          options: {
            ssl: false
          },
        },
      },
    }
  }
  
  return {
    defaultConnection: 'default',
    connections: {
      default: {
        connector: 'bookshelf',
        settings: {
          client: 'mysql2',
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 3306),
          database: env('DATABASE_NAME', 'coursedb'),
          username: env('DATABASE_USERNAME', 'root'),
          password: env('DATABASE_PASSWORD', ''),
        },
        options: {
          ssl: false
        },
      },
    },
  }
  
};
 
