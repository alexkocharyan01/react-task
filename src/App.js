import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Category from './components/Category/Category';
import CatImages from './components/CatImages/CatImages';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Category />
        <Routes>
          <Route path='categories/:id' element={ <CatImages /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
