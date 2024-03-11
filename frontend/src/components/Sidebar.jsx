import React from 'react';
import { Button, Drawer, ButtonGroup, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ user, isDrawerOpen, toggleDrawer, onSelectElement }) => {
    const navigate=useNavigate()
    return (
        <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            style={{ height: '100vh', width: '200px' }}
        >
            <div style={{ backgroundColor: 'beige', height: '100%', padding: '20px', width: '200px' }}>
                <ButtonGroup
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    orientation='vertical'
                    variant='plain'
                    color='primary'
                >
                    <div style={{ marginBottom: '5rem', marginTop: '5rem', textAlign: 'center' }}>
                        <PersonIcon fontSize='large' />
                        <Typography>{user.name}</Typography>
                    </div>
                    <Button sx={{ marginBottom: '2rem' }} onClick={() => {
                        navigate('/user')
                        toggleDrawer();
                    }}>Home</Button>
                    <Button sx={{ marginBottom: '2rem' }}>Books Rented</Button>
                    <Button sx={{ marginBottom: '2rem' }} onClick={()=>{
                        navigate('/profile')
                        toggleDrawer()
                    }}>Profile</Button>
                </ButtonGroup>
            </div>
        </Drawer>
    );
};

export default Sidebar;
