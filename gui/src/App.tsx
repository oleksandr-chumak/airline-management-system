import { Routes, Route, Navigate } from 'react-router-dom'
import RootLayoutComponent from './components/root-layout.component.tsx'
import HomePage from './pages/home.page.tsx'
import FlightsPage from '@/pages/tables/flights.page.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayoutComponent />}>
        <Route index element={<HomePage />} />
        <Route path="tables">
          <Route index element={<Navigate to="/tables/flights" replace />} />
          <Route path="flights" element={<FlightsPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App