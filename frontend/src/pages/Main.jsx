import React from 'react';
import Navbar from './../components/Navbar';
import QuotesHome from '../components/QuotesHome';
import styles from '../assets/css/Main.module.css'
import Footer from '../components/Footer';

const Main = (props) => {
  return (
    <div className={styles.mainContainer}> 
      <Navbar />
      {props.child ? props.child : <QuotesHome/>}
      <Footer/>
    </div>
  );
};

export default Main;
