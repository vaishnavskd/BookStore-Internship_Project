import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import axios from 'axios';

const AddBook = ({ open, onClose, onAdd }) => {
    const [newBookData, setNewBookData] = useState({
        name: '',
        author: '',
        genre:'',
        languages:'',
        description:'',
        availstatus: false,
        rentalperiod: '',
        coverimg: '',
        isbn:'',
        summary:''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBookData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/admin/books', newBookData);
            onAdd(response.data);
            onClose();
        } catch (error) {
            console.error('Error adding new book:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField name='name' label='Name' value={newBookData.name} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='author' label='Author' value={newBookData.author} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='rentalperiod' label='Rental Period' value={newBookData.rentalperiod} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='coverimg' label='Cover Image URL' value={newBookData.coverimg} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='description' label='Description' value={newBookData.description} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='genre' label='Genre' value={newBookData.genre} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='languages' label='Languages' value={newBookData.languages} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='summary' label='Summary' value={newBookData.summary} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name='isbn' label='ISBN' value={newBookData.summary} onChange={handleChange} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={handleSubmit}>Add</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AddBook;
