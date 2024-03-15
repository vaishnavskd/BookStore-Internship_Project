import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListBooks = () => {
    const [books,setBooks]=useState()
    useEffect(()=>{
        try {
            const fetchData=async()=>{
                const response=await axios.get('http://localhost:3001/api/admin/books')
                if(!response){
                    console.log("Unable to fetch Data");
                }
                setBooks(response?.data)
            }
        } catch (error) {
            
        }
    })
    return (
        <div>
            List of Books
        </div>
    )
}

export default ListBooks