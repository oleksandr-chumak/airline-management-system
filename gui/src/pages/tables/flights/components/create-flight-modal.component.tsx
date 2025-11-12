import { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreateFlightMutation, CreateFlightData } from '../hooks/use-flight-mutations.hook';

interface CreateFlightModalProps {
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

export function CreateFlightModal({ open, onClose, onSuccess }: CreateFlightModalProps) {
  const createFlightMutation = useCreateFlightMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateFlightData>({
    defaultValues: {
      flightNumber: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      airplaneModel: '',
      capacity: 0,
    }
  });

  const onSubmit = (data: CreateFlightData) => {
    createFlightMutation.mutate(data, {
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
          Create New Flight
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <TextField
              fullWidth
              label="Flight Number"
              {...register('flightNumber', { required: 'Flight number is required' })}
              error={!!errors.flightNumber}
              helperText={errors.flightNumber?.message}
            />
            <TextField
              fullWidth
              label="Airplane Model"
              {...register('airplaneModel', { required: 'Airplane model is required' })}
              error={!!errors.airplaneModel}
              helperText={errors.airplaneModel?.message}
            />
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Origin"
                {...register('origin', { required: 'Origin is required' })}
                error={!!errors.origin}
                helperText={errors.origin?.message}
              />
              <TextField
                fullWidth
                label="Destination"
                {...register('destination', { required: 'Destination is required' })}
                error={!!errors.destination}
                helperText={errors.destination?.message}
              />
            </div>
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="Departure Time"
                type="datetime-local"
                {...register('departureTime', { required: 'Departure time is required' })}
                error={!!errors.departureTime}
                helperText={errors.departureTime?.message}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Arrival Time"
                type="datetime-local"
                {...register('arrivalTime', { required: 'Arrival time is required' })}
                error={!!errors.arrivalTime}
                helperText={errors.arrivalTime?.message}
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <TextField
              fullWidth
              label="Capacity"
              type="number"
              {...register('capacity', {
                required: 'Capacity is required',
                min: { value: 1, message: 'Capacity must be at least 1' },
                valueAsNumber: true
              })}
              error={!!errors.capacity}
              helperText={errors.capacity?.message}
            />
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button onClick={handleClose} disabled={createFlightMutation.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createFlightMutation.isPending}
            >
              {createFlightMutation.isPending ? 'Creating...' : 'Create Flight'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
