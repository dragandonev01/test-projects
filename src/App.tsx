import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useGlobalContext } from './context'

// import pages

import SingleCocktail from './pages/SingleCocktail';
import Error from './pages/Error';

// import components
import Navbar from './components/Navbar';
import { BasicTable } from './components/BasicTable'
import  Loading  from './components/Loading'


function App() {
  const { cocktails, loading } = useGlobalContext()

  if (loading) {
    return <Loading/>
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<BasicTable cocktails={cocktails} />} />
        <Route path='random-quote' element={<SingleCocktail />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
