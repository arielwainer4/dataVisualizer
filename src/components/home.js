import React from 'react'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import BuildIcon from '@material-ui/icons/Build';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Typography, Table, TableContainer, Paper, TableRow, TableCell } from '@material-ui/core';
import '../App.css';


const Home = (props) => {
  return (
    <div style={{ margin: 40 }}>
      <TableContainer component={Paper} elevation={10} >
        <Table aria-label="simple table" >

        <TableRow>
          <TableCell align="center">
            <CheckCircleIcon style={{ margin: 15 }} className="home-icon"/>
          </TableCell>
          <TableCell align="center">
            <Typography variant="h6" style={{ margin: "0rem 2rem 0rem" }}>
              Goal
            </Typography>
          </TableCell>
          <TableCell>
            <p>Using data provided by The Covid Tracking Project, learn how to manipulate SVG elements into a variety of data visualiztion formats with the D3 library while simultantaneously improving comfort with React Hooks.</p>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">
            <BuildIcon style={{ margin: 15 }} className="home-icon" />
          </TableCell>
          <TableCell align="center">
            <Typography variant="h6" style={{ margin: "0rem 2rem 0rem" }}>
              New Tools
            </Typography>
          </TableCell>
          <TableCell>
            <p><b>D3</b> - a Javascript library that provides a data-driven approach to DOM manipulation.</p>
            <p><b>React Hooks</b> - functions recently added to React 16/8 that run based on React state changes and lifestyle features inside functional component.</p>
            <p><b>SVG</b> - an XML property to define custom vector-based graphics for scalable manipulation and animation.</p>
            <p><b>GeoJSON</b> and <b>TopoJSON</b> - GeoJSON is a format for encoding geographic data structures. TopoJSON is an extension of GeoJSON that stitches geo data together into share line segments, reducing redundencies like shared borders.</p>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">
            <EmojiObjectsIcon className="home-icon" style={{ margin: 15 }} />
          </TableCell>
          <TableCell align="center">
            <Typography variant="h6" style={{ margin: "0rem 2rem 0rem" }}>
              Inspiration
            </Typography>
          </TableCell>
          <TableCell>
            <p>Throughout the past 6 months, I've spent countless hours pouring over COVID-19 data. From line graphs representing positive cases in New York City, to animated maps demonstrating how hot spots have progressively migrated across the U.S, I have seen my fair share of informative and not so informative visuals with varying levels of complexity.</p>

            <p>So when tasked with self-teaching a new tool for the Grace Hopper Stackathon, it felt like a natural first choice to see if I could learn to make a few Covid-19 graphs myself.</p>
          </TableCell>
        </TableRow>

        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
