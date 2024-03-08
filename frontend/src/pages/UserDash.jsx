import React, { useState } from 'react';
import UserNav from '../components/UserNav';
import Sidebar from '../components/Sidebar';
import { Typography } from '@mui/material';


const UserDash = () => {
    const [user,setUser]=useState([])
    const token = localStorage.getItem("token");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <UserNav token={token} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            <Sidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} onSelectElement={setSelectedElement} />
            <div style={{ flex: 1, padding: '20px', transform: isDrawerOpen ? 'translateX(250px)' : 'none', transition: 'transform 0.3s ease' }}>
                {selectedElement ? selectedElement : (
                <Typography variant='h4' sx={{textAlign:'center'}}>
                    Welcome
                </Typography>)}
            </div>
        </>
    );
};

export default UserDash;
