import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './Pages/RegisterPage/RegisterPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import { BookingPage } from './Pages/BookingsPage/BookingPage';
import { Navbar } from './Components/Navbar/Navbar';
import "./App.css"
const App = () => {
  const {isAuthenticated, isLoading ,loginWithRedirect } = useAuth0();
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading) {
    return <div className='loading'>Loading...</div>;  
  }
  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        {isAuthenticated &&
          <>
            <Route path='/' element={<ProfilePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/booking' element={<BookingPage />} />
          </>}
      </Routes>
    </Router>
  )
}

export default App;