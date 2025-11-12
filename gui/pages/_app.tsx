"use client";
import "@/app/globals.css";

import type {AppProps} from 'next/app'
import {Geist, Geist_Mono} from "next/font/google";
import TableChartIcon from '@mui/icons-material/TableChart';
import FunctionsIcon from '@mui/icons-material/Functions';
import MemoryIcon from '@mui/icons-material/Memory';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import {usePathname} from "next/navigation";
import Link from "next/link";
import {ModuleRegistry, AllCommunityModule} from 'ag-grid-community';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const menuItems = [
  {text: 'Tables', href: '/tables', icon: <TableChartIcon/>},
  {text: 'Procedures', href: '/procedures', icon: <MemoryIcon/>},
  {text: 'Functions', href: '/functions', icon: <FunctionsIcon/>},
];

ModuleRegistry.registerModules([AllCommunityModule]);

const queryClient = new QueryClient()

export default function MyApp({Component, pageProps}: AppProps) {
  const pathname = usePathname();

  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <div>
      <AppBar position="fixed" sx={{zIndex: 10000}}>
        <Toolbar>
          <Typography variant="h4" component="h1">
            Flight Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <div>
          <Toolbar/>
          <Divider/>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname?.includes(item.href)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className="pl-55 pt-20 pr-5" style={{minWidth: "calc(100vw - 220px)", minHeight: "calc(100vh - 100px)"}}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps}/>
        </QueryClientProvider>
      </main>
    </div>
    </body>
    </html>
  );
}