import React from 'react'
import { AppBar, Button, Box, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background:'black'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{textAlign:'start', flexGrow: 1 }}>
                        Book Store
                    </Typography>
                    <Button color='inherit' onClick={()=>{
                        navigate('/')
                    }}>Home</Button>
                    <Button color="inherit" onClick={()=>{
                        navigate('/login')
                    }}>Login</Button>
                    <Button color="inherit" onClick={()=>{
                        navigate('/signup')
                    }}>Signup</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar