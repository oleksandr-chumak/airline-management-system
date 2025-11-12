import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Flight } from '@/models';

export function useFlightsQuery() {
  return useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: async () => {
      const res = await axios.get<Flight[]>('http://localhost:5000/flights');
      const flights = res.data.map((f) => ({
        ...f,
        departureTime: new Date(f.departureTime),
        arrivalTime: new Date(f.arrivalTime),
      }));
      return flights;
    },
  });
}