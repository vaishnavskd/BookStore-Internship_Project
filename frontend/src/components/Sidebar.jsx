import { Button, ButtonGroup, Typography } from '@mui/material';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import UserBooks from './UserBooks';
import UserProfile from './UserProfile';
import BooksList from './BooksList';

const Sidebar = ({ onSelectElement }) => {

    return (
        <div style={{ display: 'flex', backgroundColor: '#cccccc', margin: '0', justifyContent: 'center', height: '550px', alignItems: 'stretch' }}>
            <ButtonGroup variant='plain' orientation='vertical' color='inherit'>
                <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                    <Typography sx={{ paddingTop: '1rem' }}>UserName</Typography>
                </div>
                <Button onClick={() => onSelectElement(<BooksList/>)}>Home</Button>
                <Button onClick={() => onSelectElement(<UserBooks />)}>Books Rented</Button>
                <Button onClick={() => onSelectElement(<UserProfile />)}>Profile</Button>
            </ButtonGroup>
        </div>
    );
};

export default Sidebar;
