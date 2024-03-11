import React, { useEffect, useState } from 'react';
import UserNav from '../components/UserNav';
import Sidebar from '../components/Sidebar';
import { Typography } from '@mui/material';
import axios from 'axios';


const UserDash = (props) => {
    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    

    const fetchData = async (token) => {
        try {
            if (!token) {
                alert("Unauthorized Entry")
            }
            const response = await axios.get('http://localhost:3001/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                alert(response.data.message);
                return;
            }

            setUser(response.data);
        } catch (error) {
            console.error('Error:', error.message);
            alert('Error fetching user data');
        }
    }

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);


    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <UserNav token={token} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            <Sidebar user={user} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            <div style={{ flex: 1, padding: '20px', transform: isDrawerOpen ? 'translateX(250px)' : 'none', transition: 'transform 0.3s ease' }}>
                {props.child ? (
                        props.child
                    ) : (
                        <Typography variant='h4' sx={{ textAlign: 'center' }}>
                            Welcome {user.name}
                        </Typography>
                    )
                }
            </div>

        </>
    );
};

export default UserDash;
