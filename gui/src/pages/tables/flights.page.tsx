import { useState } from 'react'
import { TableNavigationComponent } from '@/pages/tables/components/table-navigation.component.tsx'
import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import { useQuery } from '@tanstack/react-query'
import { Flight } from '@/models'

export default function FlightsPage() {
  const { data } = useQuery<Flight[]>({
    queryKey: ['flights'],
    queryFn: () => fetch('http://localhost:5000/flights').then((r) => r.json()),
  })

  const [colDefs] = useState<ColDef<Flight>[]>([
    { field: 'flightId', editable: false },
    { field: 'flightNumber' },
    { field: 'origin' },
    { field: 'destination' },
    { field: 'departureTime' },
    { field: 'arrivalTime' },
    { field: 'airplaneModel' },
    { field: 'capacity' },
  ])

  const defaultColDef: ColDef = {
    flex: 1,
    editable: true
  }

  return (
    <>
      <TableNavigationComponent selectedValue="flights" />
      <div className="w-full h-100">
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  )
}