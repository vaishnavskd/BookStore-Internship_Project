import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';

const RentForm = ({ formOpen, onClose, book }) => {
  const handleSubmit=async()=>{

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
                  <TextField label='Library ID' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Enter your Name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label='Enter your phone number' />
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
