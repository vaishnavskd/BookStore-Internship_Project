import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddBook from './AddBook'

const ListBooks = () => {
    const [books, setBooks] = useState([])
    const [selected, setSelected] = useState(null)
    const [open, setOpen] = useState(false)
    const [availability, setAvailability] = useState('')
    const [rentalPeriod, setRentalPeriod] = useState('')
    const [image, setImage] = useState('')
    const [deleteDialog, setDeleteDialog] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/books')
                if (!response) {
                    console.log("Unable to fetch Data");
                }
                setBooks(response?.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddBook = (newBookData) => {
        console.log('New book added:', newBookData);
    };
    const handleClose = () => {
        setOpen(false);
    }

    const handleEditClick = (book) => {
        setSelected(book);
        setAvailability(book.availstatus ? "Available" : "Not Available");
        setRentalPeriod(book.rentalperiod);
        setImage(book.coverimg);
        setOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/admin/books/${id}`);
            console.log("Book deleted:", response.data);
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };


    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/admin/books/${selected._id}`, {
                "coverimg": image,
                "availstatus": availability === "Available" ? true : false,
                "rentalperiod": rentalPeriod
            });
            console.log("Book updated:", response.data);
            const updatedBooks = books.map(book => {
                if (book._id === selected._id) {
                    return { ...book, "availstatus": availability === "Available" ? true : false, "rentalperiod": rentalPeriod, "coverimg": image };
                }
                return book;
            });
            setBooks(updatedBooks);
            handleClose();
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Error")
        }
    }

    return (
        <>
            <div>
                <h2>List of Books</h2>
                <div style={{ margin: 'auto', width: '80%', padding: '1rem' }}>
                    <Table sx={{
                        width: '90%',
                        justifyContent: 'center'
                    }}>
                        <TableHead>
                            <TableRow sx={{ textAlign: 'center' }}>
                                <TableCell>Name</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Availability Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book, index) => (
                                <TableRow key={index}>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.availstatus ? "Available" : "Not Available"}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditClick(book)}>Edit</Button>
                                        <Button onClick={() => {
                                            setDeleteDialog(true)
                                            setSelected(book)
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <br />
                    <Button variant='contained' onClick={handleOpenDialog}>Add New Book</Button>
                    <AddBook open={openDialog} onClose={handleCloseDialog} onAdd={handleAddBook} />
                    <br />
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Details</DialogTitle>
                <DialogContent>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label='Availability' value={availability} onChange={(e) => setAvailability(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Rental Period' value={rentalPeriod} onChange={(e) => setRentalPeriod(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Book Image Url' value={image} onChange={(e) => setImage(e.target.value)} fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <img src={image} alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' onClick={handleUpdate}>Update</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
                <DialogContent>Are you sure you want to delete?</DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant='contained' onClick={() => { handleDelete(selected._id); setDeleteDialog(false); }}>Yes</Button>
                    <Button variant='contained' color='error' onClick={() => setDeleteDialog(false)}>No</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ListBooks
