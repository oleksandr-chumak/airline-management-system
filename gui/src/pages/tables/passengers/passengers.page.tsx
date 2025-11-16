import {useState, useMemo, useEffect} from 'react'
import {TableNavigationComponent} from '../components/table-navigation.component.tsx'
import {CreatePassengerModal} from './components/create-passenger-modal.component.tsx'
import {DeleteButtonCellRenderer} from '@/components/delete-button-cell-renderer.component.tsx'
import {AgGridReact} from 'ag-grid-react'
import {ColDef, CellValueChangedEvent} from 'ag-grid-community'
import {Passenger} from '@/models'
import Button from "@mui/material/Button"
import {usePassengersQuery} from './hooks/use-passengers-query.hook'
import {useUpdatePassengersMutation, useDeletePassengerMutation} from './hooks/use-passenger-mutations.hook'

const defaultColDef: ColDef = {editable: true}

export function PassengersPage() {
  const { data } = usePassengersQuery();
  const updatePassengersMutation = useUpdatePassengersMutation();
  const deletePassengerMutation = useDeletePassengerMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unpersistedData, setUnpersistedData] = useState<Passenger[]>([]);

  useEffect(() => {
    if (data) {
      setUnpersistedData(data);
      setIsEditing(false);
    }
  }, [data]);

  const handlePersistChanges = () => {
    updatePassengersMutation.mutate(unpersistedData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const colDefs = useMemo<ColDef[]>(() => [
    {field: 'passengerId', editable: false},
    {field: 'firstName'},
    {field: 'lastName'},
    {field: 'email'},
    {field: 'phoneNumber'},
    {
      headerName: 'Actions',
      field: 'actions',
      editable: false,
      cellRenderer: DeleteButtonCellRenderer,
      cellRendererParams: {
        onDelete: (passengerId: number) => deletePassengerMutation.mutate(passengerId),
        idField: 'passengerId',
        isDeleting: deletePassengerMutation.isPending,
      },
      width: 100,
    },
  ], [deletePassengerMutation.isPending]);

  const handleCellValueChange = (e: CellValueChangedEvent<Passenger>) => {
    setUnpersistedData((data) => data.map((passenger) => {
      return passenger.passengerId === e.data.passengerId ? e.data : passenger;
    }))
    setIsEditing(true);
  }

  return (
    <>
      <TableNavigationComponent selectedValue="passengers"/>
      <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          <Button color="primary" variant="contained" onClick={() => setIsModalOpen(true)}>
            Create new passenger
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!isEditing}
            onClick={handlePersistChanges}
            loading={updatePassengersMutation.isPending}
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
      <CreatePassengerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  )
}