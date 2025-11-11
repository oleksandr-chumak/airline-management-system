import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Flight } from './entities/Flight';
import { Passenger } from './entities/Passenger';
import { Ticket } from './entities/Ticket';
import { Audit } from './entities/Audit';
import { TicketDescription } from './entities/TicketDescription';

const AppDataSource = new DataSource({
  type: 'oracle',
  host: 'localhost',
  port: 1521,
  username: 'airline',
  password: 'strongpassword',
  serviceName: "XEPDB1",
  entities: [Flight, Passenger, Ticket, Audit, TicketDescription],
  synchronize: false,
  logging: true,
  extra: {}
});

let dataSource: DataSource;

export async function getDataSource() {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  } else {
    dataSource = await AppDataSource.initialize();
    return dataSource;
  }
}
