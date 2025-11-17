import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { UpdatePurchaseDateDto } from './dto/update-purchase-date.dto';
import { UpdateTicketPriceDto } from './dto/update-ticket-price.dto';

@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post('update-purchase-date')
  @HttpCode(HttpStatus.OK)
  async updatePurchaseDate(
    @Body() updatePurchaseDateDto: UpdatePurchaseDateDto,
  ): Promise<{ message: string }> {
    await this.proceduresService.updatePurchaseDate(
      updatePurchaseDateDto.ticketId,
    );
    return {
      message: `Purchase date updated successfully for ticket ID ${updatePurchaseDateDto.ticketId}`,
    };
  }

  @Post('fill-ticket-description')
  @HttpCode(HttpStatus.OK)
  async fillTicketDescription(): Promise<{ message: string }> {
    await this.proceduresService.fillTicketDescription();
    return {
      message: 'Ticket descriptions filled successfully',
    };
  }

  @Post('update-ticket-price')
  @HttpCode(HttpStatus.OK)
  async updateTicketPrice(
    @Body() updateTicketPriceDto: UpdateTicketPriceDto,
  ): Promise<{ message: string }> {
    await this.proceduresService.updateTicketPrice(
      updateTicketPriceDto.ticketId,
      updateTicketPriceDto.newPrice,
    );
    return {
      message: `Ticket price updated successfully for ticket ID ${updateTicketPriceDto.ticketId}`,
    };
  }
}