import React, { useEffect, useState } from 'react';
import styles from '../assets/css/BookDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';

const BookDetails = () => {
    const { bookID } = useParams();
    const [book, setBook] = useState(null);
    const [open, setOpen] = useState(false);
    const [rentFormOpen,setRentFormOpen]=useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/books/${bookID}`);
                setBook(response.data);
            } catch (error) {
                console.error('Error fetching book data:', error);
            }
        };

        fetchData();
    }, [bookID]);

    return (
        <div className={styles.container}>
            {book ? (
                <>
                    <div className={styles.title}>{book.name}</div>
                    <div className={styles.coverimg}>
                        <img src={book.coverimg} alt={book.name} />
                    </div>
                    <div className={styles.content}>
                        <b>Genre: {book.genre}</b>
                        <br />
                        <br />
                        {book.summary}
                        <br /><br />
                        <br />
                        <b>Availability Status:</b> {book.availstatus ? "Yes" : "No"}
                        <br />
                        <b>Reviews:</b>
                        <br />
                        {book.userReviews && book.userReviews.map(review => (
                            <div key={review.email}>
                                {review.email}: {review.review}
                            </div>
                        ))}
                    </div>
                    <div className={styles.button}>
                        <Button color='primary' variant='contained' onClick={() => setOpen(true)}>Rent it</Button>
                    </div>
                </>
            ) : (
                <div>Error</div>
            )}
            <Dialog open={open}>
                <DialogContent sx={{ textAlign: 'center' }}>Confirm your choice</DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button color='primary' variant='contained' onClick={()=>{
                        setRentFormOpen(true)
                    }}>Yes</Button>
                    <Button color='error' variant='contained' onClick={() => setOpen(false)}>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookDetails;
