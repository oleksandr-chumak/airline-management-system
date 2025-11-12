export class CreateTicketDto {
  flightId: number;
  passengerId: number;
  seatNumber: string;
  status: string;
  purchaseDate: Date;
  price: number;
}