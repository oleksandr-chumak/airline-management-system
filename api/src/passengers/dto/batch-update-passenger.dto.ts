import { UpdatePassengerDto } from './update-passenger.dto';

export class BatchUpdatePassengerItemDto extends UpdatePassengerDto {
  passengerId: number;
}

export class BatchUpdatePassengersDto {
  passengers: BatchUpdatePassengerItemDto[];
}