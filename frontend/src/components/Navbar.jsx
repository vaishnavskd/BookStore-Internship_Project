import React from 'react'
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/Navbar.module.css'

const Navbar = () => {
    const navigate=useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={styles.navbar}>
                <Toolbar>
                    <Typography variant='h4' component="div" sx={{textAlign:'start', flexGrow: 1 }} className={styles.navHead}>
                        BookLy
                    </Typography>
                    <Button color='inherit' onClick={()=>{
                        navigate('/')
                    }}>Home</Button>
                    <Button color='inherit' onClick={()=>{
                        navigate('/books')
                    }}>Books</Button>
                    <Button color="inherit" onClick={()=>{
                        navigate('/login')
                    }}>Login/Signup</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar