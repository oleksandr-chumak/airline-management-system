import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Passenger } from './Passenger';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { BatchUpdatePassengerItemDto } from './dto/batch-update-passenger.dto';

@Injectable()
export class PassengersService {
  private passengerRepository: Repository<Passenger>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.passengerRepository = this.dataSource.getRepository(Passenger);
  }

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const passenger = this.passengerRepository.create(createPassengerDto);
    return await this.passengerRepository.save(passenger);
  }

  async findAll(): Promise<Passenger[]> {
    return await this.passengerRepository.find();
  }

  async findOne(id: number): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({
      where: { passengerId: id },
    });

    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }

    return passenger;
  }

  async update(
    id: number,
    updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    const passenger = await this.findOne(id);

    Object.assign(passenger, updatePassengerDto);

    return await this.passengerRepository.save(passenger);
  }

  async remove(id: number): Promise<void> {
    const passenger = await this.findOne(id);
    await this.passengerRepository.remove(passenger);
  }

  async batchUpdate(
    updates: BatchUpdatePassengerItemDto[],
  ): Promise<Passenger[]> {
    const updatedPassengers: Passenger[] = [];

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      for (const updateItem of updates) {
        const { passengerId, ...updateData } = updateItem;

        const passenger = await transactionalEntityManager.findOne(Passenger, {
          where: { passengerId },
        });

        if (!passenger) {
          throw new NotFoundException(
            `Passenger with ID ${passengerId} not found`,
          );
        }

        Object.assign(passenger, updateData);
        const savedPassenger = await transactionalEntityManager.save(
          Passenger,
          passenger,
        );
        updatedPassengers.push(savedPassenger);
      }
    });

    return updatedPassengers;
  }
}
