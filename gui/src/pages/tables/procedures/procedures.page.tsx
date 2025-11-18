import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTicketsQuery } from '../tickets/hooks/use-tickets-query.hook';

interface UpdatePurchaseDateData {
  ticketId: number;
}

interface UpdateTicketPriceData {
  ticketId: number;
  newPrice: number;
}

export function ProceduresPage() {
  const { data: tickets } = useTicketsQuery();
  const [updatePurchaseDateSuccess, setUpdatePurchaseDateSuccess] = useState('');
  const [fillDescriptionSuccess, setFillDescriptionSuccess] = useState('');
  const [updatePriceSuccess, setUpdatePriceSuccess] = useState('');

  // Update Purchase Date mutation
  const updatePurchaseDateMutation = useMutation({
    mutationFn: async (data: UpdatePurchaseDateData) => {
      const res = await axios.post('http://localhost:5000/procedures/update-purchase-date', data);
      return res.data;
    },
    onSuccess: (data) => {
      setUpdatePurchaseDateSuccess(data.message);
      toast.success(data.message);
      resetPurchaseDate();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update purchase date');
    },
  });

  // Fill Ticket Description mutation
  const fillTicketDescriptionMutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post('http://localhost:5000/procedures/fill-ticket-description');
      return res.data;
    },
    onSuccess: (data) => {
      setFillDescriptionSuccess(data.message);
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to fill ticket descriptions');
    },
  });

  // Update Ticket Price mutation
  const updateTicketPriceMutation = useMutation({
    mutationFn: async (data: UpdateTicketPriceData) => {
      const res = await axios.post('http://localhost:5000/procedures/update-ticket-price', data);
      return res.data;
    },
    onSuccess: (data) => {
      setUpdatePriceSuccess(data.message);
      toast.success(data.message);
      resetTicketPrice();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update ticket price');
    },
  });

  // Form hooks
  const {
    register: registerPurchaseDate,
    handleSubmit: handleSubmitPurchaseDate,
    reset: resetPurchaseDate,
    formState: { errors: purchaseDateErrors },
  } = useForm<UpdatePurchaseDateData>();

  const {
    register: registerTicketPrice,
    handleSubmit: handleSubmitTicketPrice,
    reset: resetTicketPrice,
    formState: { errors: ticketPriceErrors },
  } = useForm<UpdateTicketPriceData>();

  const onSubmitPurchaseDate = (data: UpdatePurchaseDateData) => {
    setUpdatePurchaseDateSuccess('');
    updatePurchaseDateMutation.mutate(data);
  };

  const onSubmitTicketPrice = (data: UpdateTicketPriceData) => {
    setUpdatePriceSuccess('');
    updateTicketPriceMutation.mutate(data);
  };

  const handleFillTicketDescription = () => {
    setFillDescriptionSuccess('');
    fillTicketDescriptionMutation.mutate();
  };

  return (
    <>
      <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
        <Typography variant="h4" component="h1" gutterBottom>
          Database Procedures
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Execute database procedures to perform specific operations on your data.
        </Typography>

        {/* Update Purchase Date Procedure */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Update Purchase Date
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Updates the purchase date of a specific ticket to the current timestamp.
            </Typography>
            <form onSubmit={handleSubmitPurchaseDate(onSubmitPurchaseDate)}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  select
                  fullWidth
                  label="Ticket"
                  defaultValue=""
                  {...registerPurchaseDate('ticketId', {
                    required: 'Ticket is required',
                    valueAsNumber: true,
                  })}
                  error={!!purchaseDateErrors.ticketId}
                  helperText={purchaseDateErrors.ticketId?.message}
                >
                  {tickets?.map((ticket) => (
                    <MenuItem key={ticket.ticketId} value={ticket.ticketId}>
                      Ticket #{ticket.ticketId} - Seat {ticket.seatNumber} ({ticket.status})
                    </MenuItem>
                  ))}
                </TextField>
                {updatePurchaseDateSuccess && (
                  <Alert severity="success">{updatePurchaseDateSuccess}</Alert>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={updatePurchaseDateMutation.isPending}
                >
                  {updatePurchaseDateMutation.isPending ? 'Updating...' : 'Update Purchase Date'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Fill Ticket Description Procedure */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Fill Ticket Descriptions
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Automatically fills in descriptions for all tickets based on flight information.
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {fillDescriptionSuccess && (
                <Alert severity="success">{fillDescriptionSuccess}</Alert>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleFillTicketDescription}
                disabled={fillTicketDescriptionMutation.isPending}
              >
                {fillTicketDescriptionMutation.isPending
                  ? 'Filling Descriptions...'
                  : 'Fill Ticket Descriptions'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Update Ticket Price Procedure */}
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Update Ticket Price
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Updates the price of a specific ticket to a new value.
            </Typography>
            <form onSubmit={handleSubmitTicketPrice(onSubmitTicketPrice)}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  select
                  fullWidth
                  label="Ticket"
                  defaultValue=""
                  {...registerTicketPrice('ticketId', {
                    required: 'Ticket is required',
                    valueAsNumber: true,
                  })}
                  error={!!ticketPriceErrors.ticketId}
                  helperText={ticketPriceErrors.ticketId?.message}
                >
                  {tickets?.map((ticket) => (
                    <MenuItem key={ticket.ticketId} value={ticket.ticketId}>
                      Ticket #{ticket.ticketId} - Current Price: ${ticket.price}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="New Price"
                  type="number"
                  inputProps={{ step: '0.01', min: '0' }}
                  {...registerTicketPrice('newPrice', {
                    required: 'New price is required',
                    min: { value: 0, message: 'Price must be at least 0' },
                    valueAsNumber: true,
                  })}
                  error={!!ticketPriceErrors.newPrice}
                  helperText={ticketPriceErrors.newPrice?.message}
                />
                {updatePriceSuccess && <Alert severity="success">{updatePriceSuccess}</Alert>}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={updateTicketPriceMutation.isPending}
                >
                  {updateTicketPriceMutation.isPending ? 'Updating...' : 'Update Ticket Price'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}