import React from 'react';
import './App.css';
import MyD3Component from './components/graph'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <MyD3Component data={[1,2,3]}/>
      </header>
    </div>
  );
}

export default App;

