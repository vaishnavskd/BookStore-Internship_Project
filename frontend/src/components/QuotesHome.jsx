import React, { useEffect, useState } from 'react';
import styles from '../assets/css/QuotesHome.module.css';

const QuotesHome = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/quotes.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const jsonData = await response.json();
        setQuotes(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData()    
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === quotes.length - 1 ? 0 : prevIndex + 1));
    }, 10000); 

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className={styles.main}>
        <div className={styles.quote}>
          <p>{quotes[currentIndex]?.quote}</p>
          <p>- {quotes[currentIndex]?.author}</p>
        </div>
      </div>
  );
};

export default QuotesHome;
