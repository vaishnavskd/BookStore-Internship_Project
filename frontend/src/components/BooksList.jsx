import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  DialogActions
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BooksList = () => {
  const token = localStorage.getItem('token')
  const [bookData, setBookData] = useState([])
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/books');
        setBookData(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center'
    }}>
      <br />
      <br />
      <Grid container spacing={2}>
        {bookData.map((book, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
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
              <CardActions sx={{justifyContent:'center',alignItems:'baseline'}}>
                <Button size="small" onClick={() => {
                  setSelected(book);
                  setOpen(true);
                }}>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ textAlign: 'center' }}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <Container>
            {selected && selected.description}
          </Container>
        </DialogContent>
        {token && <DialogActions sx={{justifyContent:'center'}}>
          <Button variant='outlined'>Rent</Button>
        </DialogActions>}
      </Dialog>

    </div>
  )
}

export default BooksList
