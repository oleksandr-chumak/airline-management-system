import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Audit } from '@/models';

export const useAuditsQuery = () => {
  return useQuery<Audit[]>({
    queryKey: ['audits'],
    queryFn: async () => {
      const res = await axios.get<Audit[]>('http://localhost:5000/audits');
      return res.data;
    },
  });
}