import {useState, useMemo, useEffect} from 'react'
import {TableNavigationComponent} from '../components/table-navigation.component.tsx'
import {CreateTicketModal} from './components/create-ticket-modal.component.tsx'
import {DeleteButtonCellRenderer} from '@/components/delete-button-cell-renderer.component.tsx'
import {AgGridReact} from 'ag-grid-react'
import {ColDef, CellValueChangedEvent} from 'ag-grid-community'
import {Ticket} from '@/models'
import Button from "@mui/material/Button"
import {useTicketsQuery} from './hooks/use-tickets-query.hook'
import {useUpdateTicketsMutation, useDeleteTicketMutation} from './hooks/use-ticket-mutations.hook'

const defaultColDef: ColDef = {editable: true}

export function TicketsPage() {
  const { data } = useTicketsQuery();
  const updateTicketsMutation = useUpdateTicketsMutation();
  const deleteTicketMutation = useDeleteTicketMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unpersistedData, setUnpersistedData] = useState<Ticket[]>([]);

  useEffect(() => {
    if (data) {
      setUnpersistedData(data);
      setIsEditing(false);
    }
  }, [data]);

  const handlePersistChanges = () => {
    updateTicketsMutation.mutate(unpersistedData, {
      onSuccess: () => setIsEditing(false)
    });
  };

  const colDefs = useMemo<ColDef[]>(() => [
    {field: 'ticketId', editable: false},
    {field: 'flightId' },
    {field: 'passengerId'},
    {field: 'seatNumber'},
    {field: 'status'},
    {field: 'purchaseDate', cellDataType: "dateTime" },
    {field: 'price'},
    {
      headerName: 'Actions',
      field: 'actions',
      editable: false,
      cellRenderer: DeleteButtonCellRenderer,
      cellRendererParams: {
        onDelete: (ticketId: number) => deleteTicketMutation.mutate(ticketId),
        idField: 'ticketId',
        isDeleting: deleteTicketMutation.isPending,
      },
      width: 100,
    },
  ], [deleteTicketMutation.isPending]);

  const handleCellValueChange = (e: CellValueChangedEvent<Ticket>) => {
    setUnpersistedData((data) => data.map((ticket) => {
      return ticket.ticketId === e.data.ticketId ? e.data : ticket;
    }))
    setIsEditing(true);
  }

  return (
    <>
      <TableNavigationComponent selectedValue="tickets"/>
      <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
        <div className="flex justify-end gap-2">
          <Button color="primary" variant="contained" onClick={() => setIsModalOpen(true)}>
            Create new ticket
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!isEditing}
            onClick={handlePersistChanges}
            loading={updateTicketsMutation.isPending}
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
      <CreateTicketModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsModalOpen(false)}
      />
    </>
  )
}