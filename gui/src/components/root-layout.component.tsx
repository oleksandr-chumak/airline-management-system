import { Outlet, useLocation, Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TableChartIcon from '@mui/icons-material/TableChart'
import FunctionsIcon from '@mui/icons-material/Functions'
import MemoryIcon from '@mui/icons-material/Memory'

const menuItems = [
  { text: 'Tables', href: '/tables', icon: <TableChartIcon /> },
  { text: 'Procedures', href: '/procedures', icon: <MemoryIcon /> },
  { text: 'Functions', href: '/functions', icon: <FunctionsIcon /> },
]

export default function RootLayoutComponent() {
  const location = useLocation()

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h4" component="h1">
            Flight Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <div>
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.href}>
                <ListItemButton
                  component={Link}
                  to={item.href}
                  selected={location.pathname.includes(item.href)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main
        className="pl-55 pt-20 pr-5"
        style={{
          minWidth: 'calc(100vw - 220px)',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}