import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import axios from 'axios';

const RentForm = ({ formOpen, onClose, book }) => {
  const token = localStorage.getItem('token');
  const [libID, setLibID] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const handleSubmit = async () => {
    try {
      const { name, _id } = book; 
      const response = await axios.post('http://localhost:3001/api/user/rent', { bookName: name, bookID: _id },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      console.log("Response:", response.data); 
    } catch (error) {
      console.error("Error:", error); 
    }
    onClose()
  }
  return (
    <>
      {book ? (
        <>
          <Dialog open={formOpen} onClose={onClose} sx={{ textAlign: 'center' }}>
            <DialogTitle>Rent Form</DialogTitle>
            <DialogContent>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label='Book Name' value={book.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Book Author' value={book.author} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Library ID' value={libID} onChange={(e) =>setLibID(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Enter your Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Enter your phone number' value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color='primary' variant='contained' onClick={handleSubmit}>Submit</Button>
              <Button color='error' variant='contained' onClick={onClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (<>
        Error
      </>
      )}
    </>
  );
};

export default RentForm;
