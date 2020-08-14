import React from 'react';
import './App.css';
import {Graph} from './components'

function App() {
  const api = 'https://api.covidtracking.com/v1/states/tx/daily.json'

  return (
    <div className="App">
      <header className="App-header">
        <Graph api={api}/>
      </header>
    </div>
  );
}

export default App;

