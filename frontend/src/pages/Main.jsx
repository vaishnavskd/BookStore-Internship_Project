import React from 'react';
import Navbar from './../components/Navbar';
import { Typography } from '@mui/material';
import styles from '../assets/css/Main.module.css'; 

const Main = (props) => {
  return (
    <div className={styles.main}> 
      <Navbar />
      {props.child ? props.child : <Typography variant='h4' sx={{ textAlign: 'center' }}>Welcome</Typography>}
    </div>
  );
};

export default Main;
