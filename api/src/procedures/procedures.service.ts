import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class ProceduresService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async updatePurchaseDate(ticketId: number): Promise<void> {
    const connection = this.dataSource.manager.connection;

    try {
      await connection.query(
        `BEGIN flight_management_pkg.update_purchase_date(:ticket_id); END;`,
        [ticketId],
      );
    } catch (error) {
      if (error.message && error.message.includes('Ticket not found')) {
        throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
      }
      throw error;
    }
  }

  async fillTicketDescription(): Promise<void> {
    const connection = this.dataSource.manager.connection;

    await connection.query(
      `BEGIN flight_management_pkg.fill_ticket_description; END;`,
    );
  }

  async updateTicketPrice(ticketId: number, newPrice: number): Promise<void> {
    const connection = this.dataSource.manager.connection;

    try {
      await connection.query(
        `BEGIN flight_management_pkg.update_ticket_price(:ticket_id, :new_price); END;`,
        [ticketId, newPrice],
      );
    } catch (error) {
      if (error.message && error.message.includes('Ticket ID not found')) {
        throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
      }
      if (error.message && error.message.includes('Discount not required')) {
        throw new Error(
          'Cannot update price: less than 10 tickets in the system',
        );
      }
      throw error;
    }
  }
}
