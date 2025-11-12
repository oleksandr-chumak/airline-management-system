import Tabs from '@mui/material/Tabs'
import { MuiLinkTabComponent } from '@/components/mui-link-tab.component.tsx'

interface Props {
  selectedValue: 'flights' | 'passengers' | 'tickets' | 'audits' | 'ticket-descriptions'
}

export function TableNavigationComponent({ selectedValue }: Props) {
  return (
    <Tabs value={selectedValue} role="navigation" sx={{ paddingBottom: 2 }}>
      <MuiLinkTabComponent value="flights" label="FlightsPage" href="/tables/flights" />
      <MuiLinkTabComponent value="passengers" label="Passengers" href="/tables/passengers" />
      <MuiLinkTabComponent value="tickets" label="Tickets" href="/tables/tickets" />
      <MuiLinkTabComponent value="audits" label="Audits" href="/tables/audits" />
      <MuiLinkTabComponent
        value="ticket-descriptions"
        label="Ticket Descriptions"
        href="/tables/ticket-descriptions"
      />
    </Tabs>
  )
}