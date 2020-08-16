import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import { Graph } from './components/index'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ margin: "0rem 2rem 0rem" }}>
            Covid Data Visualizer
          </Typography>
          <Typography variant="h6">
            <Link to="/linegraph">Line Graph</Link>
          </Typography>
        </Toolbar>
        </AppBar>
      </nav>
      <main>
        <Container maxWidth="md" >
          <Route exact path="/linegraph" component={Graph} />
        </Container>
        </main>
    </div>
    </Router>
  );
}

export default App;

