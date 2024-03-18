import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserList = () => {
    const token = localStorage.getItem('token')
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response) {
                    throw new Error("Error Fetching details");
                }
                setUsers(response.data)
            } catch (error) {
                console.error("Internal Server Error:", error.message);
                setError("Internal Server Error. Please try again later.");
            }
        }
        fetchData()
    }, [token])

    return (
        <>
            <div>
                <Typography>List of Users</Typography>
                {error && <Typography color="error">{error}</Typography>} 
                <div style={{ margin: 'auto', width: '80%', padding: '1rem' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        <Button>Edit</Button>
                                        <Button>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default UserList
