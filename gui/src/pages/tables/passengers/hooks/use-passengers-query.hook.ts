import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Passenger } from '@/models';

export function usePassengersQuery() {
  return useQuery<Passenger[]>({
    queryKey: ['passengers'],
    queryFn: async () => {
      const res = await axios.get<Passenger[]>('http://localhost:5000/passengers');
      return res.data;
    },
  });
}