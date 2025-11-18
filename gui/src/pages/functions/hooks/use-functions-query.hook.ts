import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface MixStringsParams {
  str1: string;
  str2: string;
}

interface MixStringsResponse {
  result: string;
}

interface CheapestFlightParams {
  modelName: string;
}

interface CheapestFlightResponse {
  flightNumber: string | null;
}

interface TicketsByPriceParams {
  maxPrice: number;
}

interface TicketsByPriceResponse {
  ticketIds: number[];
}

export function useMixStringsMutation() {
  return useMutation<MixStringsResponse, Error, MixStringsParams>({
    mutationFn: async (params) => {
      const res = await axios.get<MixStringsResponse>(
        'http://localhost:5000/functions/mix-strings',
        { params }
      );
      return res.data;
    },
  });
}

export function useCheapestFlightMutation() {
  return useMutation<CheapestFlightResponse, Error, CheapestFlightParams>({
    mutationFn: async (params) => {
      const res = await axios.get<CheapestFlightResponse>(
        'http://localhost:5000/functions/cheapest-flight-by-model',
        { params }
      );
      return res.data;
    },
  });
}

export function useTicketsByPriceMutation() {
  return useMutation<TicketsByPriceResponse, Error, TicketsByPriceParams>({
    mutationFn: async (params) => {
      const res = await axios.get<TicketsByPriceResponse>(
        'http://localhost:5000/functions/tickets-by-price',
        { params }
      );
      return res.data;
    },
  });
}