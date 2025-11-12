import { UpdateFlightDto } from './update-flight.dto';

export class BatchUpdateFlightItemDto extends UpdateFlightDto {
  flightId: number;
}

export class BatchUpdateFlightsDto {
  flights: BatchUpdateFlightItemDto[];
}