import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import EqualizerIcon from '@material-ui/icons/Equalizer';


const Footer = (props) => {
  return (
      <BottomNavigation showLabels>
         <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} component={'a'} href="http://github.com/arielwainer4/dataVisualizer"/>
         <BottomNavigationAction label="Original Data Source" icon={<StorageIcon />} component={'a'} href="https://covidtracking.com/data/api"/>
         <BottomNavigationAction label="d3" icon={<EqualizerIcon />} component={'a'} href="https://d3js.org/"/>
      </BottomNavigation>
  )
}

export default Footer
