import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { type Flight } from './Flight';
import { type Passenger } from './Passenger';

@Entity('TICKETS')
export class Ticket {
  @PrimaryGeneratedColumn({ name: 'TICKET_ID' })
  ticketId: number;

  @Column({ name: 'FLIGHT_ID' })
  flightId: number;

  @Column({ name: 'PASSENGER_ID' })
  passengerId: number;

  @Column({ name: 'SEAT_NUMBER' })
  seatNumber: string;

  @Column({ name: 'STATUS' })
  status: string;

  @Column({ name: 'PURCHASE_DATE' })
  purchaseDate: Date;

  @Column({ name: 'PRICE' })
  price: number;

  @ManyToOne('FLIGHTS', (flight) => flight.tickets)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;

  @ManyToOne('PASSENGERS', (passenger) => passenger.tickets)
  @JoinColumn({ name: 'passenger_id' })
  passenger: Passenger;
}
