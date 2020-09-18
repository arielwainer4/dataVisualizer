import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";


const Nav = (props) => {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h3" style={{ margin: "0rem 2rem 0rem" }}>
      <Link to="/" >Covid Data Visualizer </Link>
      </Typography>
      <Typography variant="h6">
        <Link to="/graph" style={{ margin: "0rem 2rem 0rem" }}>Graph Tool</Link>
      </Typography>
      <Typography variant="h6" align="center">
        <Link to="/about">About</Link>
      </Typography>
    </Toolbar>
    </AppBar>
  )
}

export default Nav
