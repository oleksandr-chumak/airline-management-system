export class CreateFlightDto {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  airplaneModel: string;
  capacity: number;
}