import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Flight } from '../flights/Flight';
import { Passenger } from '../entities/Passenger';
import { Ticket } from '../tickets/Ticket';
import { Audit } from '../entities/Audit';
import { TicketDescription } from '../entities/TicketDescription';

@Global()
@Module({
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'oracle',
          host: 'localhost',
          port: 1521,
          username: 'airline',
          password: 'strongpassword',
          serviceName: 'XEPDB1',
          entities: [Flight, Passenger, Ticket, Audit, TicketDescription],
          synchronize: false,
          logging: true,
          extra: {},
        });

        return dataSource.initialize();
      },
    },
  ],
  exports: ['DATA_SOURCE'],
})
export class DatabaseModule {}
