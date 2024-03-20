import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

type NewType = PostgresConnectionOptions;

const config: NewType = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: '123456',
  database: 'mediumclone',
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
  synchronize: false,
  migrations: [path.join(__dirname, '/migrations/**/*{.ts, .js}')],
	cli: {
    migrationsDir: 'src/migrations',
  }
};

export default config;