'use client';

import { useState } from 'react';
import type {Flight} from '@/db/entities/Flight'
import {TableNavigation} from '@/app/components/tables/table-navigation.component';
import {AgGridReact} from 'ag-grid-react';
import {ColDef} from 'ag-grid-community';
import {useQuery} from '@tanstack/react-query'

export default function Flights() {
  const {data} = useQuery<Flight[]>({
      queryKey: ["flights"],
      queryFn: () => fetch('/api/flights').then(r => r.json())
    }
  )

  const [colDefs] = useState<ColDef<Flight>[]>([
    { field: "flightId" },
    { field: "flightNumber" },
    { field: "origin" },
    { field: "destination" },
    { field: "departureTime" },
    { field: "arrivalTime" },
    { field: "airplaneModel" },
    { field: "capacity" }
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  return (
    <>
      <TableNavigation selectedValue="flights"/>
      <div className="w-full h-100">
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </>
  );
}
