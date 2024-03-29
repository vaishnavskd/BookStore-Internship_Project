import React from 'react'
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../assets/css/Navbar.module.css'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <Box>
            <AppBar position="static" className={styles.navbar} color='inherit'>
                <Toolbar>
                    <Typography variant='h4' component="div" sx={{ textAlign: 'start', flexGrow: 1 }} className={styles.navHead}>
                        BookLy
                    </Typography>
                    <Button color='inherit' onClick={() => {
                        navigate('/')
                    }} sx={{ textTransform: 'capitalize' }}>Home</Button>
                    <Button color='inherit' onClick={() => {
                        navigate('/books')
                    }} sx={{ textTransform: 'capitalize' }}>Books</Button>
                    <Button color="inherit" onClick={() => {
                        navigate('/login')
                    }} sx={{ textTransform: 'capitalize' }}>Login/Signup</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar