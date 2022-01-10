import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: 'katana.db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
  },
};

export default config;
