import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Flight } from '../entities/Flight';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService {
  private flightRepository: Repository<Flight>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.flightRepository = this.dataSource.getRepository(Flight);
  }

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = this.flightRepository.create(createFlightDto);
    return await this.flightRepository.save(flight);
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightRepository.find();
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({
      where: { flightId: id },
    });

    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }

    return flight;
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.findOne(id);

    Object.assign(flight, updateFlightDto);

    return await this.flightRepository.save(flight);
  }

  async remove(id: number): Promise<void> {
    const flight = await this.findOne(id);
    await this.flightRepository.remove(flight);
  }
}