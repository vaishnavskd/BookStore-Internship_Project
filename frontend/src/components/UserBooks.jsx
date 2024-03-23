import React, { useEffect, useState } from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const UserBooks = () => {
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({ rentedBooks: [] }); 
  const [open,setOpen]=useState(false)
  const [closeDialog,setCloseDialog]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
    <div style={{ margin: 'auto', width: '80%', padding: '1rem' }}>
      <Typography variant='h4'>List of Book</Typography>
      <br />
      <Table sx={{ width: '90%', justifyContent: 'center' }}>
        <TableHead>
          <TableRow sx={{ textAlign: 'center' }}>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.rentedBooks.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>
                <Button onClick={()=>{
                  setOpen(true)
                }}>Add Review</Button>
                <Button onClick={()=>{setCloseDialog(true)
                }}>Close Rent</Button>
                <Dialog open={closeDialog} onClose={()=>{setCloseDialog(false)}} sx={{textAlign:'center'}}>
                    <DialogTitle>Are you sure want to close the rent?</DialogTitle>
                    <DialogActions sx={{justifyContent:'center'}}>
                      <Button color='primary' variant='contained'>Yes</Button>
                      <Button color='error' variant='contained' onClick={()=>{setCloseDialog(false)}}>No</Button>
                    </DialogActions>
                  </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <Dialog open={open} onClose={()=>{
      setOpen(false)
    }}>
      <DialogTitle>Add Review</DialogTitle>
      <DialogContent>
        <label htmlFor='review'>Review</label>
        <br />
        <textarea id='review' name='review' rows={6} cols={80} />
      </DialogContent>
      <DialogActions>
        <Button>Add Review</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default UserBooks;
