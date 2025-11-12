import {useState} from 'react'
import {TableNavigationComponent} from '@/pages/tables/components/table-navigation.component.tsx'
import {CreateFlightModal} from '@/pages/tables/components/create-flight-modal.component.tsx'
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
      const res = await axios.get<Flight[]>('http://localhost:5000/flights')
      const flights = res.data.map((f) => ({
        ...f,
        departureTime: new Date(f.departureTime),
        arrivalTime: new Date(f.arrivalTime)
      }))

      setUnpersistedData(flights);
      setIsEditing(false);
      return flights;
    },
  })

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    {field: 'flightNumber' },
    {field: 'origin'},
    {field: 'destination'},
    {field: 'departureTime', cellDataType: "dateTime" },
    {field: 'arrivalTime', cellDataType: "dateTime" },
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
          <Button color="primary" variant="contained" onClick={() => setIsModalOpen(true)}>
            Create new flight
          </Button>
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
      <CreateFlightModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  )
}