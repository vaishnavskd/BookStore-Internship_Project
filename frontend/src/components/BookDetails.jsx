import React, { useEffect, useState } from 'react';
import styles from '../assets/css/BookRent.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const { bookID } = useParams();
    const [book, setBook] = useState(null); // Initialize book state as null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/books/${bookID}`);
                setBook(response.data); // Set book data into state
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, [bookID]); // Add bookID to the dependency array to re-fetch data when it changes

    // Render book details
    return (
        <div className={styles.container}>
            {book ? (
                <>
                    <div className={styles.title}>{book.name}</div>
                    <div className={styles.coverimg}>
                        <img src={book.coverimg} alt={book.name} />
                    </div>
                    <div className={styles.content}>{book.description}</div>
                    {/* Add other book details here */}
                    <div className={styles.button}>
                        {/* Render button or action component */}
                    </div>
                </>
            ) : (
                <div>Error</div>
            )}
        </div>
    );
};

export default BookDetails;
