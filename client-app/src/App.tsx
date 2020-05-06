import React from 'react';
import logo from './logo.svg';
import './App.css';
import {cars} from './demo'

function App() {
  return (
    <div className="App">
      {cars.map(car =>
      <li>{car.color}</li>)}
    </div>
  );
}

export default App;
