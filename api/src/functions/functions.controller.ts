import { Controller, Get, Query } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { MixStringsDto } from './dto/mix-strings.dto';
import { GetCheapestFlightDto } from './dto/get-cheapest-flight.dto';
import { GetTicketsByPriceDto } from './dto/get-tickets-by-price.dto';

@Controller('functions')
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @Get('mix-strings')
  async mixStrings(
    @Query() mixStringsDto: MixStringsDto,
  ): Promise<{ result: string }> {
    const result = await this.functionsService.mixStrings(
      mixStringsDto.str1,
      mixStringsDto.str2,
    );
    return { result };
  }

  @Get('cheapest-flight-by-model')
  async getCheapestFlightByModel(
    @Query() getCheapestFlightDto: GetCheapestFlightDto,
  ): Promise<{ flightNumber: string | null }> {
    const flightNumber = await this.functionsService.getCheapestFlightByModel(
      getCheapestFlightDto.modelName,
    );
    return { flightNumber };
  }

  @Get('tickets-by-price')
  async getTicketsByPrice(
    @Query() getTicketsByPriceDto: GetTicketsByPriceDto,
  ): Promise<{ ticketIds: number[] }> {
    const ticketIds = await this.functionsService.getTicketsByPrice(
      getTicketsByPriceDto.maxPrice,
    );
    return { ticketIds };
  }
}