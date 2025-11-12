import Tab from '@mui/material/Tab';
import Link from 'next/link';

export interface MuiLinkTabProps {
  label: string;
  href: string;
  value: string;
}

export function MuiLinkTab({label, href, value}: MuiLinkTabProps) {
  return (
    <Tab
      component={Link}
      href={href}
      label={label}
      value={value}
    />
  );
}