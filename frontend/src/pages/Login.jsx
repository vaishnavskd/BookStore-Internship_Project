import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, Link, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/Login.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            if (response.data && response.data.accessToken) {
                const token = response.data.accessToken;
                const role=response?.data?.role
                localStorage.setItem("token", token);
                navigate(role === 'user' ? '/user' : '/admin');
            } else {
                console.error("Unauthorized Entry", response.data);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    

    return (
        <div className={styles.main} >
            <Grid container spacing={2} className={styles.login}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="initial">Login</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Email/Username" name='email' variant='outlined' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Password" name='password' variant='outlined' value={password} type='password' onChange={(e) => setPassword(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleSubmit}>Login</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Don't have an account? <Link href="/signup" style={{ textDecoration: 'none' }}>Sign-up</Link></Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
