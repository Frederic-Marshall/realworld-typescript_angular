import ormconfig from '@app/ormconfig'

const ormseedconfig = {
	...ormconfig,

	migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
	cli: {
		migratinsDir: 'src/seeds',
	}
};

export default ormseedconfig