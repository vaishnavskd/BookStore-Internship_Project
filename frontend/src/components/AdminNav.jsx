import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {
    const token=localStorage.getItem('token')
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.clear(token);
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#e6e6e6' }}>
        <div>
            Admin
        </div>
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
        </div>
    );
}

export default AdminNav