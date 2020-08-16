import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, Container} from '@material-ui/core'
import { Graph, Footer } from './components/index'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" style={{ margin: "0rem 2rem 0rem" }}>
            Covid Data Visualizer
          </Typography>
          <Typography variant="h6">
            <Link to="/graph" style={{ margin: "0rem 2rem 0rem" }}>Graph</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/map">Map</Link>
          </Typography>
        </Toolbar>
        </AppBar>
      </nav>
      <main>
        <Container maxWidth="md" >
          <Route exact path="/graph" component={Graph} />
          <Route exact path="/map" component={Map} />
        </Container>
        </main>
        <footer>
          <Footer />
        </footer>
    </div>
    </Router>
  );
}

export default App;

