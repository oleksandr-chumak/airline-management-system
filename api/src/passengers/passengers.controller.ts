import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { BatchUpdatePassengersDto } from './dto/batch-update-passenger.dto';
import { Passenger } from './Passenger';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengersService: PassengersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengersService.create(createPassengerDto);
  }

  @Get()
  async findAll(): Promise<Passenger[]> {
    return await this.passengersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Passenger> {
    return await this.passengersService.findOne(id);
  }

  @Put('batch')
  @HttpCode(HttpStatus.OK)
  async batchUpdate(
    @Body() batchUpdateDto: BatchUpdatePassengersDto,
  ): Promise<Passenger[]> {
    return await this.passengersService.batchUpdate(batchUpdateDto.passengers);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    return await this.passengersService.update(id, updatePassengerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.passengersService.remove(id);
  }
}
