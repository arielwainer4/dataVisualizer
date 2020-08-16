import React from 'react'
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';
import EqualizerIcon from '@material-ui/icons/Equalizer';


const Footer = (props) => {
  return (
      <BottomNavigation showLabels>
         <BottomNavigationAction label="GitHub" icon={<GitHubIcon />} component={Link} to="//github.com/arielwainer4/dataVisualizer"/>
         <BottomNavigationAction label="Original Data Source" icon={<StorageIcon />} />
         <BottomNavigationAction label="d3" icon={<EqualizerIcon />} />
      </BottomNavigation>
  )
}

export default Footer
