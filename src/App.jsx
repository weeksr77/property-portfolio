// App.jsx
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PropertyPage from './pages/PropertyPage'
import Floor from './pages/Floor'
import Location from './pages/Location'
import AllAmenities from './pages/AllAmenities'
import ContactUs from './pages/ContactUs'
import PortfolioPage from './pages/PortfolioPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>


        {/* Portfolio / landing page (optional later) */}
        <Route path="/" element={<PortfolioPage/>} />

        {/* ✅ THIS IS THE IMPORTANT ONE */}
        <Route path="/property/:slug" element={<PropertyPage />} />

        <Route path="/property/:slug/floor" element={<Floor />} />

        {/* Optional static pages */}
      
        <Route path="/location" element={<Location />} />
        <Route path="/property/:slug/amenities" element={<AllAmenities />} />

        <Route path="/contact" element={<ContactUs />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App



