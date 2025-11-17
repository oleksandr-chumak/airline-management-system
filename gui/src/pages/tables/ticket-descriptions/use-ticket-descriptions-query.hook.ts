import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TicketDescription } from '@/models';

export const useTicketDescriptionsQuery = () => {
  return useQuery<TicketDescription[]>({
    queryKey: ['ticket-descriptions'],
    queryFn: async () => {
      const res = await axios.get<TicketDescription[]>('http://localhost:5000/ticket-descriptions');
      return res.data;
    },
  });
}