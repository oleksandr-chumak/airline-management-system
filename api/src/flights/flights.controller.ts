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
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { BatchUpdateFlightsDto } from './dto/batch-update-flight.dto';
import { Flight } from './Flight';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
    return await this.flightsService.create(createFlightDto);
  }

  @Get()
  async findAll(): Promise<Flight[]> {
    return await this.flightsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Flight> {
    return await this.flightsService.findOne(id);
  }

  @Put('batch')
  @HttpCode(HttpStatus.OK)
  async batchUpdate(
    @Body() batchUpdateDto: BatchUpdateFlightsDto,
  ): Promise<Flight[]> {
    return await this.flightsService.batchUpdate(batchUpdateDto.flights);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return await this.flightsService.update(id, updateFlightDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.flightsService.remove(id);
  }
}
