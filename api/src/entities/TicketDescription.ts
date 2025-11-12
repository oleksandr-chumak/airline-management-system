import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('TICKET_DESCRIPTIONS')
export class TicketDescription {
  @PrimaryColumn({ name: "AIRPLANE_MODEL"})
  airplaneModel: string;

  @Column({ name: "TICKET_LIST" })
  ticketList: string;
}
