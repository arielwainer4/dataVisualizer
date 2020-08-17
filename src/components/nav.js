import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";


const Footer = (props) => {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h3" style={{ margin: "0rem 2rem 0rem" }}>
        Covid Data Visualizer
      </Typography>
      <Typography variant="h6">
        <Link to="/graph" style={{ margin: "0rem 2rem 0rem" }}>Graph</Link>
      </Typography>
      <Typography variant="h6" align="center">
        <Link to="/map">Map</Link>
      </Typography>
    </Toolbar>
    </AppBar>
  )
}

export default Footer
