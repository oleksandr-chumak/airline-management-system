import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Ticket } from '@/models';

export function useTicketsQuery() {
  return useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      const res = await axios.get<Ticket[]>('http://localhost:5000/tickets');
      const tickets = res.data.map((t) => ({
        ...t,
        purchaseDate: new Date(t.purchaseDate),
      }));
      return tickets;
    },
  });
}