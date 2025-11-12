import { NextResponse } from 'next/server';
import { getDataSource } from '@/db/data-source';
import { Flight } from '@/db/entities/Flight';

export async function GET() {
  try {
    const dataSource = await getDataSource();
    const flightRepository = dataSource.getRepository(Flight);
    const flights = await flightRepository.find();
    return NextResponse.json(flights);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch flights' }, { status: 500 });
  }
}
