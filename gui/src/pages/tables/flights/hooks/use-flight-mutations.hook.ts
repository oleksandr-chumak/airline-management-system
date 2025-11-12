import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Flight } from '@/models';

interface CreateFlightData {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  airplaneModel: string;
  capacity: number;
}

export function useCreateFlightMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flightData: CreateFlightData) => {
      const response = await axios.post<Flight>('http://localhost:5000/flights', flightData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast.success('Flight created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create flight');
    },
  });
}

export function useUpdateFlightsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flights: Flight[]) => {
      const response = await axios.put<Flight[]>('http://localhost:5000/flights/batch', { flights });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast.success('Flights updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update flights');
    },
  });
}

export function useDeleteFlightMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flightId: number) => {
      await axios.delete(`http://localhost:5000/flights/${flightId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flights'] });
      toast.success('Flight deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete flight');
    },
  });
}

export type { CreateFlightData };