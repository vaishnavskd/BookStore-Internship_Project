import React from 'react';
import Navbar from './../components/Navbar';
import QuotesHome from '../components/QuotesHome';

const Main = (props) => {
  return (
    <div > 
      <Navbar />
      {props.child ? props.child : <QuotesHome/>}
    </div>
  );
};

export default Main;
