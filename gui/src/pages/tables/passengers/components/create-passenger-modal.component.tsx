import { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useCreatePassengerMutation, CreatePassengerData } from '../hooks/use-passenger-mutations.hook';

interface CreatePassengerModalProps {
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

export function CreatePassengerModal({ open, onClose, onSuccess }: CreatePassengerModalProps) {
  const createPassengerMutation = useCreatePassengerMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreatePassengerData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    }
  });

  const onSubmit = (data: CreatePassengerData) => {
    createPassengerMutation.mutate(data, {
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
          Create New Passenger
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <TextField
                fullWidth
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <TextField
                fullWidth
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Phone Number"
              {...register('phoneNumber', { required: 'Phone number is required' })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button onClick={handleClose} disabled={createPassengerMutation.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createPassengerMutation.isPending}
            >
              {createPassengerMutation.isPending ? 'Creating...' : 'Create Passenger'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}