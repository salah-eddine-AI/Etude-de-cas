import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CreateReservation from './components/CreateReservation';
import ViewReservation from './components/ViewReservation';
import UpdateReservation from './components/UpdateReservation';
import ReservationList from './components/ReservationList';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/create" element={<CreateReservation />} />
          <Route path="/view" element={<ViewReservation />} />
          <Route path="/update/:id" element={<UpdateReservation />} />
          <Route path="/reservations" element={<ReservationList />} />
          <Route path="/" element={<ReservationList />} />
          <Route path="/update/:reservationId" element={<UpdateReservation />} />
          <Route path="/view/:reservationId" element={<ViewReservation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
