import {useTicketDescriptionsQuery} from './use-ticket-descriptions-query.hook';
import {TableNavigationComponent} from '../components/table-navigation.component.tsx'

import {useMemo} from 'react'
import {AgGridReact} from 'ag-grid-react'
import {ColDef} from 'ag-grid-community'

export const TicketDescriptionsPage = () => {
  const {data} = useTicketDescriptionsQuery();

  const colDefs = useMemo<ColDef[]>(() => [
    {field: 'airplaneModel'},
    {field: 'ticketList'},
  ], []);

  return (
    <>
      <TableNavigationComponent selectedValue="ticket-descriptions"/>
      <div className="p-6 rounded-3xl bg-white w-full flex flex-col gap-4">
        <div className="w-full h-100">
          <AgGridReact
            rowData={data}
            columnDefs={colDefs}
          />
        </div>
      </div>
    </>
  )
}