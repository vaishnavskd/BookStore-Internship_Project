import React from 'react';
import { Button, Drawer, ButtonGroup, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BooksList from './BooksList';

const Sidebar = ({ isDrawerOpen, toggleDrawer, onSelectElement }) => {

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
                        <Typography>UserName</Typography>
                    </div>
                    <Button sx={{ marginBottom: '2rem' }} onClick={() => {
                        onSelectElement(<BooksList />);
                        toggleDrawer();
                    }}>Home</Button>
                    <Button sx={{ marginBottom: '2rem' }}>Books Rented</Button>
                    <Button sx={{ marginBottom: '2rem' }}>Profile</Button>
                </ButtonGroup>
            </div>
        </Drawer>
    );
};

export default Sidebar;
