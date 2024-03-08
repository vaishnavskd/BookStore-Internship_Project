import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

const UserNav = ({ token, isDrawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.clear(token);
        navigate('/');
    };

    return (
        <div
            style={{
                display: 'flex',
                height: '4rem',
                padding: '0',
                margin: '0',
                backgroundColor:'black',
                justifyContent:'space-between'
            }}
        >
            <Button sx={{color:'white'}} onClick={toggleDrawer}><MenuTwoToneIcon /></Button>
            <Button sx={{color:'white'}} onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default UserNav;
