import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import axios from 'axios';

const UserProfile = () => {
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = response.data;
            setName(userData.name);
            setEmail(userData.email);
            setPhone(userData.phone);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    

    const handleSave = async () => {
        try {
            const response = await axios.put('http://localhost:3001/api/user', { email, name, phone }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response?.status === 200) {
                alert("Successfully Updated");
                setOpen(false);
                fetchUserData();
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div style={{ display: 'grid', padding: '5rem', placeItems: 'center', color: 'black' }}>
            <AccountCircleRoundedIcon sx={{ fontSize: '100px' }} />
            <br />
            <Typography variant='h5'>Profile</Typography>
            <br /><br />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Name: {name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Email: {email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Phone: {phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={() => setOpen(true)}>Edit Profile</Button>
                </Grid>
            </Grid>
            <Dialog open={open} sx={{ textAlign: 'center' }}>
                <DialogTitle>Edit Profile</DialogTitle>
                <br />
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth label='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={handleSave}>Save</Button>
                    <Button variant='contained' color='error' onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserProfile;
