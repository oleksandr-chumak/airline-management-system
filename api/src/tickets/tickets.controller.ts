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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { BatchUpdateTicketsDto } from './dto/batch-update-ticket.dto';
import { Ticket } from './Ticket';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketsService.create(createTicketDto);
  }

  @Get()
  async findAll(): Promise<Ticket[]> {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Ticket> {
    return await this.ticketsService.findOne(id);
  }

  @Put('batch')
  @HttpCode(HttpStatus.OK)
  async batchUpdate(
    @Body() batchUpdateDto: BatchUpdateTicketsDto,
  ): Promise<Ticket[]> {
    return await this.ticketsService.batchUpdate(batchUpdateDto.tickets);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return await this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.ticketsService.remove(id);
  }
}