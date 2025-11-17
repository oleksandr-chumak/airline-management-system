import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Audit } from '../entities/Audit';

@Injectable()
export class AuditsService {
  private auditRepository: Repository<Audit>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.auditRepository = this.dataSource.getRepository(Audit);
  }

  async findAll(): Promise<Audit[]> {
    return await this.auditRepository.find();
  }
}
