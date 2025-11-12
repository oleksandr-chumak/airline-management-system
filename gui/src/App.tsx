import { Routes, Route, Navigate } from 'react-router-dom'
import RootLayoutComponent from './components/root-layout.component.tsx'
import { HomePage } from './pages/home.page.tsx'
import { FlightsPage } from '@/pages/tables/flights/flights.page.tsx'
import { TicketsPage } from '@/pages/tables/tickets/tickets.page.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayoutComponent />}>
          <Route index element={<HomePage />} />
          <Route path="tables">
            <Route index element={<Navigate to="/tables/flights" replace />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="tickets" element={<TicketsPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App