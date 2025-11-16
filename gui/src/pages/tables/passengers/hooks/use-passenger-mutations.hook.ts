import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Passenger } from '@/models';

interface CreatePassengerData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export function useCreatePassengerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (passengerData: CreatePassengerData) => {
      const response = await axios.post<Passenger>('http://localhost:5000/passengers', passengerData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passengers'] });
      toast.success('Passenger created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create passenger');
    },
  });
}

export function useUpdatePassengersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (passengers: Passenger[]) => {
      const response = await axios.put<Passenger[]>('http://localhost:5000/passengers/batch', { passengers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passengers'] });
      toast.success('Passengers updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update passengers');
    },
  });
}

export function useDeletePassengerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (passengerId: number) => {
      await axios.delete(`http://localhost:5000/passengers/${passengerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passengers'] });
      toast.success('Passenger deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete passenger');
    },
  });
}

export type { CreatePassengerData };