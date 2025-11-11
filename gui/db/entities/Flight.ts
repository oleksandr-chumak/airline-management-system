import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { type Ticket } from './Ticket';

@Entity('FLIGHTS')
export class Flight {
  @PrimaryGeneratedColumn({ name: 'FLIGHT_ID' })
  flightId: number;

  @Column({ name: 'FLIGHT_NUMBER' })
  flightNumber: string;

  @Column({ name: 'ORIGIN' })
  origin: string;

  @Column({ name: 'DESTINATION' })
  destination: string;

  @Column({ name: 'DEPARTURE_TIME' })
  departureTime: Date;

  @Column({ name: 'ARRIVAL_TIME' })
  arrivalTime: Date;

  @Column({ name: 'AIRPLANE_MODEL' })
  airplaneModel: string;

  @Column({ name: 'CAPACITY' })
  capacity: number;

  @OneToMany('TICKETS', (ticket) => ticket.flight)
  tickets: Ticket[];
}
