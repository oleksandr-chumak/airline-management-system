import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  useMixStringsMutation,
  useCheapestFlightMutation,
  useTicketsByPriceMutation,
} from './hooks/use-functions-query.hook';
import { useFlightsQuery } from '../tables/flights/hooks/use-flights-query.hook';

interface MixStringsFormData {
  str1: string;
  str2: string;
}

interface CheapestFlightFormData {
  modelName: string;
}

interface TicketsByPriceFormData {
  maxPrice: number;
}

export function FunctionsPage() {
  const { data: flights } = useFlightsQuery();
  const mixStringsMutation = useMixStringsMutation();
  const cheapestFlightMutation = useCheapestFlightMutation();
  const ticketsByPriceMutation = useTicketsByPriceMutation();

  const [mixStringsResult, setMixStringsResult] = useState<string | null>(null);
  const [cheapestFlightResult, setCheapestFlightResult] = useState<string | null>(null);
  const [ticketsByPriceResult, setTicketsByPriceResult] = useState<number[] | null>(null);

  // Get unique airplane models from flights
  const airplaneModels = Array.from(
    new Set(flights?.map((f) => f.airplaneModel) || [])
  );

  // Mix Strings Form
  const {
    register: registerMixStrings,
    handleSubmit: handleSubmitMixStrings,
    reset: resetMixStrings,
    formState: { errors: mixStringsErrors },
  } = useForm<MixStringsFormData>();

  // Cheapest Flight Form
  const {
    register: registerCheapestFlight,
    handleSubmit: handleSubmitCheapestFlight,
    reset: resetCheapestFlight,
    formState: { errors: cheapestFlightErrors },
  } = useForm<CheapestFlightFormData>();

  // Tickets By Price Form
  const {
    register: registerTicketsByPrice,
    handleSubmit: handleSubmitTicketsByPrice,
    reset: resetTicketsByPrice,
    formState: { errors: ticketsByPriceErrors },
  } = useForm<TicketsByPriceFormData>();

  const onSubmitMixStrings = (data: MixStringsFormData) => {
    setMixStringsResult(null);
    mixStringsMutation.mutate(data, {
      onSuccess: (result) => {
        setMixStringsResult(result.result);
        toast.success('Strings mixed successfully!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to mix strings');
      },
    });
  };

  const onSubmitCheapestFlight = (data: CheapestFlightFormData) => {
    setCheapestFlightResult(null);
    cheapestFlightMutation.mutate(data, {
      onSuccess: (result) => {
        setCheapestFlightResult(result.flightNumber || 'No flight found');
        toast.success('Cheapest flight retrieved successfully!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to get cheapest flight');
      },
    });
  };

  const onSubmitTicketsByPrice = (data: TicketsByPriceFormData) => {
    setTicketsByPriceResult(null);
    ticketsByPriceMutation.mutate(data, {
      onSuccess: (result) => {
        setTicketsByPriceResult(result.ticketIds);
        toast.success('Tickets retrieved successfully!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || 'Failed to get tickets by price');
      },
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
      <Typography variant="h4" component="h1" gutterBottom>
        Database Functions
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Execute database functions to retrieve and process data.
      </Typography>

      {/* Mix Strings Function */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Mix Strings
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Combines two strings by alternating characters from each string.
          </Typography>
          <form onSubmit={handleSubmitMixStrings(onSubmitMixStrings)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="String 1"
                {...registerMixStrings('str1', {
                  required: 'String 1 is required',
                })}
                error={!!mixStringsErrors.str1}
                helperText={mixStringsErrors.str1?.message}
              />
              <TextField
                fullWidth
                label="String 2"
                {...registerMixStrings('str2', {
                  required: 'String 2 is required',
                })}
                error={!!mixStringsErrors.str2}
                helperText={mixStringsErrors.str2?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={mixStringsMutation.isPending}
              >
                {mixStringsMutation.isPending ? 'Executing...' : 'Execute Function'}
              </Button>
            </Box>
          </form>

          {mixStringsResult && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Result:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mixed String</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{mixStringsResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Cheapest Flight By Model Function */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Get Cheapest Flight By Model
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Retrieves the cheapest flight for a specific airplane model.
          </Typography>
          <form onSubmit={handleSubmitCheapestFlight(onSubmitCheapestFlight)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                select
                fullWidth
                label="Airplane Model"
                defaultValue=""
                {...registerCheapestFlight('modelName', {
                  required: 'Airplane model is required',
                })}
                error={!!cheapestFlightErrors.modelName}
                helperText={cheapestFlightErrors.modelName?.message}
              >
                {airplaneModels.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={cheapestFlightMutation.isPending}
              >
                {cheapestFlightMutation.isPending ? 'Executing...' : 'Execute Function'}
              </Button>
            </Box>
          </form>

          {cheapestFlightResult && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Result:
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Flight Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{cheapestFlightResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Tickets By Price Function */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Get Tickets By Price
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Retrieves all ticket IDs with a price less than or equal to the specified maximum price.
          </Typography>
          <form onSubmit={handleSubmitTicketsByPrice(onSubmitTicketsByPrice)}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                fullWidth
                label="Maximum Price"
                type="number"
                inputProps={{ step: '0.01', min: '0' }}
                {...registerTicketsByPrice('maxPrice', {
                  required: 'Maximum price is required',
                  min: { value: 0, message: 'Price must be at least 0' },
                  valueAsNumber: true,
                })}
                error={!!ticketsByPriceErrors.maxPrice}
                helperText={ticketsByPriceErrors.maxPrice?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={ticketsByPriceMutation.isPending}
              >
                {ticketsByPriceMutation.isPending ? 'Executing...' : 'Execute Function'}
              </Button>
            </Box>
          </form>

          {ticketsByPriceResult && (
            <Box mt={2}>
              <Typography variant="subtitle2" gutterBottom>
                Result: {ticketsByPriceResult.length} ticket(s) found
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticket ID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ticketsByPriceResult.length === 0 ? (
                      <TableRow>
                        <TableCell>No tickets found</TableCell>
                      </TableRow>
                    ) : (
                      ticketsByPriceResult.map((ticketId) => (
                        <TableRow key={ticketId}>
                          <TableCell>{ticketId}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </CardContent>
      </Card>
    </div>
  );
}