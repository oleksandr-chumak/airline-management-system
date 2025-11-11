import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: 'localhost',
  port: 1521,
  username: 'airline',
  password: 'strongpassword',
  serviceName: 'XEPDB1', // Use serviceName for PDB connections
  entities: ['app/entities/**/*.ts'], // Use glob path to avoid circular dependency issues
  synchronize: false,
  logging: true,
});

// This function will initialize the data source if it's not already initialized
// and return the existing instance if it is.
export async function getDataSource() {
    if (AppDataSource.isInitialized) {
        return AppDataSource;
    }
    return await AppDataSource.initialize();
}
