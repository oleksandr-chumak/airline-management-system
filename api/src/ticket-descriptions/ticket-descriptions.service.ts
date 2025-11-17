import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TicketDescription } from '../entities/TicketDescription';

@Injectable()
export class TicketDescriptionsService {
  private ticketDescriptionRepository: Repository<TicketDescription>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.ticketDescriptionRepository =
      dataSource.getRepository(TicketDescription);
  }

  findAll() {
    return this.ticketDescriptionRepository.find();
  }
}
