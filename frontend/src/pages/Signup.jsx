import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, Link, TextField } from '@mui/material';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import styles from '../assets/css/Signup.module.css'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState();
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordsMatch(password === confirmPassword);
        }
    }, [password, confirmPassword]);

    const handleSignup = async () => {
        try {
            if (!email && !password && !name) {
                toast.error("Enter valid credentials")
            }
            else {
                const response = await axios.post('http://localhost:3001/api/signup', { email, password, name, phone })
                toast.success("Successfully Registered")
                navigate('/login')
            }

        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response')
            } else if (error.response?.status === 409) {
                setErrMsg('Email already exists')
            } else {
                setErrMsg('Registration Failed')
            }
            toast.error(errMsg)
        }
    };

    return (
        <div className={styles.main}>
            <Grid container spacing={2} className={styles.signupContainer}>
                <Grid item xs={12}>
                    <Typography variant="h4" color="initial">Signup</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Your Name"
                        name="name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Your Email"
                        name='email'
                        variant='outlined'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Your Phone Number"
                        name='phone'
                        variant='outlined'
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        fullWidth
                    />
                    {(password || confirmPassword) && !passwordsMatch && <span style={{ color: 'red' }}>Passwords don't match</span>}
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleSignup}>Signup</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Already have an account? <Link href="/login" style={{ textDecoration: 'none' }}>Login</Link></Typography>
                </Grid>
            </Grid>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </div>
    )
}

export default Signup;
