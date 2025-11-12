import { Module } from '@nestjs/common';
import { FlightsModule } from './flights/flights.module';
import { DatabaseModule } from './common/database.module';

@Module({
  imports: [DatabaseModule, FlightsModule],
})
export class AppModule {}
