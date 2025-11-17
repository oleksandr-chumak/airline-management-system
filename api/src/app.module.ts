import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { TicketsModule } from './tickets/tickets.module';
import { DatabaseModule } from './common/database.module';
import { PassengersModule } from './passengers/passengers.module';
import { TicketDescriptionsModule } from './ticket-descriptions/ticket-descriptions.module';
import { AuditsModule } from './audits/audits.module';
import { ProceduresModule } from './procedures/procedures.module';
import { FunctionsModule } from './functions/functions.module';

@Module({
  imports: [
    DatabaseModule,
    FlightsModule,
    PassengersModule,
    TicketsModule,
    AuditsModule,
    TicketDescriptionsModule,
    ProceduresModule,
    FunctionsModule
  ],
})
export class AppModule {}
