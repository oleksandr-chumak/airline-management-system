import Tabs from '@mui/material/Tabs';
import {MuiLinkTab} from "@/app/components/mui/mui-link-tab.component"

interface Props {
  selectedValue: "flights" | "passengers" | "tickets" | "audits" | "ticket-descriptions"
}

export function TableNavigation({ selectedValue }: Props) {
  return (
    <Tabs value={selectedValue} role="navigation" sx={{paddingBottom: 2}}>
      <MuiLinkTab value="flights" label="Flights" href="/tables/flights"/>
      <MuiLinkTab value="passengers" label="Passengers" href="/tables/passengers"/>
      <MuiLinkTab value="tickets" label="Tickets" href="/tables/tickets"/>
      <MuiLinkTab value="audits" label="Audits" href="/tables/audits"/>
      <MuiLinkTab value="ticket-descriptions" label="Ticket Descriptions" href="/tables/ticket-descriptions"/>
    </Tabs>
  )
}