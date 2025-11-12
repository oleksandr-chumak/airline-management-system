import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { DatabaseModule } from './common/database.module';

@Module({
  imports: [DatabaseModule, FlightsModule, TicketsModule],
})
export class AppModule {}
