import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import ReservationList from './ReservationList';
import AddReservation from './AddReservation';

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Reservation Manager</h1>
        <AddReservation />
        <ReservationList />
      </div>
    </ApolloProvider>
  );
}

export default App;
