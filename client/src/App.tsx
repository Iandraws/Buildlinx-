import React from 'react';
import Pumpen from './pages/Pumpen/pumpen';
import Homepage from './pages/HomePage/Homepage';
import Root from './pages/Root/root';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import store from './Redux/store';
import { Provider } from 'react-redux';
import Compare from './pages/Compare/compare';
import Controller from './pages/Controller/controller';
import Ventil from './pages/Ventil/Ventil';
import Corb from './pages/Corb/corb';
import SavedFilters from './pages/SavedFilters/SavedFilters';



const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
      <Route path='/Home' element={<Homepage />} />
      <Route path='pumpen' element={<Pumpen />} />
    <Route path='controller' element={<Controller />} />   
    <Route path='Ventil' element={<Ventil />} /> 
	  <Route path='compare' element={<Compare />} />
    <Route path='corb' element={<Corb/>} />
    <Route path='saved-filter' element={<SavedFilters/>} />

    </Route>
  )
);

function App() {
  return (
	<div>
    <ApolloProvider client={client}>
      <Provider store={store}>
        
          <RouterProvider router={router} />
        
      </Provider>
    </ApolloProvider>
	</div>
  );
}

export default App;
