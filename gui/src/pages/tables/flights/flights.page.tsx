import {useState, useMemo, useEffect} from 'react'
import {TableNavigationComponent} from '../components/table-navigation.component.tsx'
import {CreateFlightModal} from './components/create-flight-modal.component.tsx'
import {DeleteButtonCellRenderer} from '@/components/delete-button-cell-renderer.component.tsx'
import {AgGridReact} from 'ag-grid-react'
import {ColDef, CellValueChangedEvent} from 'ag-grid-community'
import {Flight} from '@/models'
import Button from "@mui/material/Button"
import {useFlightsQuery} from './hooks/use-flights-query.hook'
import {useUpdateFlightsMutation, useDeleteFlightMutation} from './hooks/use-flight-mutations.hook'

const defaultColDef: ColDef = {editable: true}

export function FlightsPage() {
  const { data } = useFlightsQuery();
  const updateFlightsMutation = useUpdateFlightsMutation();
  const deleteFlightMutation = useDeleteFlightMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unpersistedData, setUnpersistedData] = useState<Flight[]>([]);

  useEffect(() => {
    if (data) {
      setUnpersistedData(data);
      setIsEditing(false);
    }
  }, [data]);

  const handlePersistChanges = () => {
    updateFlightsMutation.mutate(unpersistedData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const colDefs = useMemo<ColDef[]>(() => [
    {field: 'flightId', editable: false},
    {field: 'flightNumber' },
    {field: 'origin'},
    {field: 'destination'},
    {field: 'departureTime', cellDataType: "dateTime" },
    {field: 'arrivalTime', cellDataType: "dateTime" },
    {field: 'airplaneModel'},
    {field: 'capacity'},
    {
      headerName: 'Actions',
      field: 'actions',
      editable: false,
      cellRenderer: DeleteButtonCellRenderer,
      cellRendererParams: {
        onDelete: (flightId: number) => deleteFlightMutation.mutate(flightId),
        idField: 'flightId',
        isDeleting: deleteFlightMutation.isPending,
      },
      width: 100,
    },
  ], [deleteFlightMutation.isPending]);

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
            onClick={handlePersistChanges}
            loading={updateFlightsMutation.isPending}
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