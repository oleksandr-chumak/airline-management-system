import {useState} from 'react'
import {TableNavigationComponent} from '@/pages/tables/components/table-navigation.component.tsx'
import {AgGridReact} from 'ag-grid-react'
import {ColDef, CellValueChangedEvent} from 'ag-grid-community'
import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query'
import {Flight} from '@/models'
import Button from "@mui/material/Button"
import axios from "axios";

const defaultColDef: ColDef = {editable: true}

export function FlightsPage() {
  const queryClient = useQueryClient();
  const {data} = useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: async () => {
      const flights = await axios.get<Flight[]>('http://localhost:5000/flights')
      setUnpersistedData(flights.data);
      setIsEditing(false);
      return flights.data;
    },
  })

  const [isEditing, setIsEditing] = useState(false);
  const [unpersistedData, setUnpersistedData] = useState<Flight[]>([]);

  const persistDataMutation = useMutation({
    mutationFn: async (flights: Flight[]) => {
      const response = await axios.put<Flight[]>('http://localhost:5000/flights/batch', { flights })
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      setIsEditing(false);
    },
  });

  const [colDefs] = useState<ColDef<Flight>[]>([
    {field: 'flightId', editable: false},
    {field: 'flightNumber'},
    {field: 'origin'},
    {field: 'destination'},
    {field: 'departureTime'},
    {field: 'arrivalTime'},
    {field: 'airplaneModel'},
    {field: 'capacity'},
  ])

  const handleCellValueChange = (e: CellValueChangedEvent<Flight>) => {
    setUnpersistedData((data) => data.map((flight) => {
      return flight.flightId === e.data.flightId ? e.data : flight;
    }))
    setIsEditing(true);
  }

  return (
    <>
      <TableNavigationComponent selectedValue="flights"/>
      <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          <Button color="primary" variant="contained">Create new flight</Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!isEditing}
            onClick={() => persistDataMutation.mutate(unpersistedData)}
            loading={persistDataMutation.isPending}
          >
            Persist changes
          </Button>
        </div>
        <div className="w-full h-100">
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            onCellValueChanged={handleCellValueChange}
          />
        </div>
      </div>
    </>
  )
}