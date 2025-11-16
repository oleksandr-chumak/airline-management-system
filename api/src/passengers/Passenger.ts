import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { type Ticket } from '../tickets/Ticket';

@Entity('PASSENGERS')
export class Passenger {
  @PrimaryGeneratedColumn({ name: 'PASSENGER_ID' })
  passengerId: number;

  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @Column({ name: 'LAST_NAME' })
  lastName: string;

  @Column({ name: 'EMAIL' })
  email: string;

  @Column({ name: 'PHONE_NUMBER'})
  phoneNumber: string;

  @OneToMany('TICKETS', (ticket: Ticket) => ticket.passenger)
  tickets: Ticket[];
}
