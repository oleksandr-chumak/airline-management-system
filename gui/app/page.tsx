'use client';

import { useState, useEffect } from 'react';
import type { Flight } from './models'

export default function Home() {
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch('/api/flights');
        if (!res.ok) {
          throw new Error('Failed to fetch flights');
        }
        const data = await res.json() as Flight[];
        setFlights(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchFlights();
  }, []);

  return (
    <main>
      <h1>Airline Management System</h1>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <section>
        <h2>Flights</h2>
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Model</th>
              <th>Capacity</th>
              <th>Tickets</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.flightId}>
                <td>{flight.flightNumber}</td>
                <td>{flight.origin}</td>
                <td>{flight.destination}</td>
                <td>{new Date(flight.departureTime).toLocaleString()}</td>
                <td>{new Date(flight.arrivalTime).toLocaleString()}</td>
                <td>{flight.airplaneModel}</td>
                <td>{flight.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}