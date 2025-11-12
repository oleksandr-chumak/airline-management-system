import { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateTicketMutation, CreateTicketData } from '../hooks/use-ticket-mutations.hook';

interface CreateTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const statusOptions = [
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function CreateTicketModal({ open, onClose, onSuccess }: CreateTicketModalProps) {
  const createTicketMutation = useCreateTicketMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTicketData>({
    defaultValues: {
      flightId: 0,
      passengerId: 0,
      seatNumber: '',
      status: 'CONFIRMED',
      purchaseDate: '',
      price: 0,
    }
  });

  const onSubmit = (data: CreateTicketData) => {
    createTicketMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onSuccess();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" mb={3}>
          Create New Ticket
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Flight ID"
                type="number"
                {...register('flightId', {
                  required: 'Flight ID is required',
                  min: { value: 1, message: 'Flight ID must be at least 1' },
                  valueAsNumber: true
                })}
                error={!!errors.flightId}
                helperText={errors.flightId?.message}
              />
              <TextField
                fullWidth
                label="Passenger ID"
                type="number"
                {...register('passengerId', {
                  required: 'Passenger ID is required',
                  min: { value: 1, message: 'Passenger ID must be at least 1' },
                  valueAsNumber: true
                })}
                error={!!errors.passengerId}
                helperText={errors.passengerId?.message}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Seat Number"
                {...register('seatNumber', { required: 'Seat number is required' })}
                error={!!errors.seatNumber}
                helperText={errors.seatNumber?.message}
              />
              <TextField
                fullWidth
                select
                label="Status"
                defaultValue="CONFIRMED"
                {...register('status', { required: 'Status is required' })}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              fullWidth
              label="Purchase Date"
              type="datetime-local"
              {...register('purchaseDate', { required: 'Purchase date is required' })}
              error={!!errors.purchaseDate}
              helperText={errors.purchaseDate?.message}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be at least 0' },
                valueAsNumber: true
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button onClick={handleClose} disabled={createTicketMutation.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createTicketMutation.isPending}
            >
              {createTicketMutation.isPending ? 'Creating...' : 'Create Ticket'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}