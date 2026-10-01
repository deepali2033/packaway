import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login  from './pages/Login'
import Register  from './pages/Register'
import Dashboard from './pages/Dashboard'
import TripDetails from './pages/TripDetails'
import ProtectedRoute from "./pages/ProtectedRoute";

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /></ProtectedRoute>} />
 <Route
        path="/dashboard/trips/:id"
        element={<TripDetails />}
    />
            </Routes>
        </BrowserRouter>
  )
}

export default App
