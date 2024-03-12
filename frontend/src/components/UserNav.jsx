import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

const UserNav = ({ token, isDrawerOpen, toggleDrawer, onSelectElement }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear(token);
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem',backgroundColor:'#e6e6e6' }}>
            <div>
                <Button sx={{ color: 'black' }} onClick={toggleDrawer}><MenuTwoToneIcon /></Button>
            </div>
            <div>
                <Button sx={{ color: 'black', justifySelf: 'end' }} onClick={() => { navigate('/books-available') }}>Books</Button>
                <Button sx={{ color: 'black', justifySelf: 'end' }} onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default UserNav;
