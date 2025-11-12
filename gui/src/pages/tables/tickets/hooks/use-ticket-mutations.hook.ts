import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Ticket } from '@/models';

interface CreateTicketData {
  flightId: number;
  passengerId: number;
  seatNumber: string;
  status: string;
  purchaseDate: string;
  price: number;
}

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketData: CreateTicketData) => {
      const response = await axios.post<Ticket>('http://localhost:5000/tickets', ticketData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket created successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create ticket');
    },
  });
}

export function useUpdateTicketsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tickets: Ticket[]) => {
      const response = await axios.put<Ticket[]>('http://localhost:5000/tickets/batch', { tickets });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Tickets updated successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update tickets');
    },
  });
}

export function useDeleteTicketMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketId: number) => {
      await axios.delete(`http://localhost:5000/tickets/${ticketId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast.success('Ticket deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete ticket');
    },
  });
}

export type { CreateTicketData };