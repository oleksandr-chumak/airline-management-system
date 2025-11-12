import Tab from '@mui/material/Tab'
import { Link } from 'react-router-dom'

export interface MuiLinkTabProps {
  label: string
  href: string
  value: string
}

export function MuiLinkTabComponent({ label, href, value }: MuiLinkTabProps) {
  return (
    <Tab
      component={Link}
      to={href}
      label={label}
      value={value}
    />
  )
}