
export interface Flight {
  flightId: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  airplaneModel: string;
  capacity: number;
  tickets: Ticket[];
}

export interface Ticket {
  ticketId: number;
  flightId: number;
  passengerId: number;
  seatNumber: string;
  status: string;
  purchaseDate: Date;
  price: number;
  flight: Flight;
  passenger: Passenger;
}

export interface Passenger {
  passenger_id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  tickets: Ticket[];
}

export interface Audit {
  commandId: number;
  tableName: string;
  actionDate: string;
  command: string;
}

export interface TicketDescription {
  airplaneModel: string;
  ticketList: string;
}
