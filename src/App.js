import React from 'react';
import './App.css';
import { Container} from '@material-ui/core'
import { Graph, Footer, Nav, Home } from './components/index'
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      <nav>
        <Nav />
      </nav>
      <main>
        <Container maxWidth="md" >
          <Route exact path='/' component={Home} />
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

