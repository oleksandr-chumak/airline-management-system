import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { type Flight } from '../flights/Flight';
import { type Passenger } from '../entities/Passenger';

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

  @ManyToOne('FLIGHTS', (flight: Flight) => flight.tickets)
  @JoinColumn({ name: 'FLIGHT_ID' })
  flight: Flight;

  @ManyToOne('PASSENGERS', (passenger: Passenger) => passenger.tickets)
  @JoinColumn({ name: 'PASSENGER_ID' })
  passenger: Passenger;
}
