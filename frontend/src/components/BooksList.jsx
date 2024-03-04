import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BooksList = () => {
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/books');
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      padding: '5%',
      textAlign: 'center'
    }}>
      <Typography variant='h4'>Books List</Typography>
      <br />
      <br />
      <Grid container spacing={2}>
        {bookData.map((book, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                sx={{ height: 300 }}
                image={book.coverimg}
                title={book.name}
                style={{ objectFit: 'contain' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default BooksList
