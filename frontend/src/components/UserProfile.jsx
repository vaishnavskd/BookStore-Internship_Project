import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const UserProfile = () => {
    return (
        <div style={{ display: 'grid', padding: '5rem', placeItems: 'center' }}>
            <AccountCircleRoundedIcon sx={{fontSize:'100px' }}/>
            <br />
            <Typography variant='h5'>Profile</Typography>
            <br /><br />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Name</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Library ID</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Email</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained'>Edit Profile</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserProfile
