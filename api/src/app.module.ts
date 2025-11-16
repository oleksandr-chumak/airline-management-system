import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { DatabaseModule } from './common/database.module';
import { PassengersModule } from './passengers/passengers.module';

@Module({
  imports: [DatabaseModule, FlightsModule, PassengersModule, TicketsModule],
})
export class AppModule {}
