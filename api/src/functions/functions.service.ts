import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class FunctionsService {
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {}

  async mixStrings(str1: string, str2: string): Promise<string> {
    const connection = this.dataSource.manager.connection;

    const result = await connection.query(
      `SELECT flight_management_pkg.mix_strings(:str1, :str2) AS result FROM dual`,
      [str1, str2],
    );

    return result[0]?.RESULT || '';
  }

  async getCheapestFlightByModel(
    modelName: string,
  ): Promise<string | null> {
    const connection = this.dataSource.manager.connection;

    const result = await connection.query(
      `SELECT flight_management_pkg.get_cheapest_flight_by_model(:model_name) AS result FROM dual`,
      [modelName],
    );

    return result[0]?.RESULT || null;
  }

  async getTicketsByPrice(maxPrice: number): Promise<number[]> {
    const connection = this.dataSource.manager.connection;

    const result = await connection.query(
      `SELECT flight_management_pkg.get_tickets_by_price(:max_price) AS result FROM dual`,
      [maxPrice],
    );

    const ticketIdsString = result[0]?.RESULT;

    if (!ticketIdsString) {
      return [];
    }

    return ticketIdsString
      .split(',')
      .map((id: string) => parseInt(id.trim(), 10))
      .filter((id: number) => !isNaN(id));
  }
}