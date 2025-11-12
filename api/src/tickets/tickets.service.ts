import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './Ticket';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BatchUpdateTicketItemDto } from './dto/batch-update-ticket.dto';

@Injectable()
export class TicketsService {
  private ticketRepository: Repository<Ticket>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ticketRepository = this.dataSource.getRepository(Ticket);
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(createTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      relations: ['flight', 'passenger'],
    });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({
      where: { ticketId: id },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    Object.assign(ticket, updateTicketDto);

    return await this.ticketRepository.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }

  async batchUpdate(updates: BatchUpdateTicketItemDto[]): Promise<Ticket[]> {
    const updatedTickets: Ticket[] = [];

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      for (const updateItem of updates) {
        const { ticketId, ...updateData } = updateItem;

        const ticket = await transactionalEntityManager.findOne(Ticket, {
          where: { ticketId },
        });

        if (!ticket) {
          throw new NotFoundException(`Ticket with ID ${ticketId} not found`);
        }

        Object.assign(ticket, updateData);
        const savedTicket = await transactionalEntityManager.save(
          Ticket,
          ticket,
        );
        updatedTickets.push(savedTicket);
      }
    });

    return updatedTickets;
  }
}