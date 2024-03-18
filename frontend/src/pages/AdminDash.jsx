import React from 'react'
import AdminNav from '../components/AdminNav'
import { Button, ButtonGroup } from '@mui/material'
import styles from '../assets/css/Admin.module.css'
import { useNavigate } from 'react-router-dom'
const AdminDash = (props) => {
  const navigate=useNavigate()
  return (
    <>
      <AdminNav />
      {props.child? props.child:(<div className={styles.mainContainer}>
        <div>
          <ButtonGroup orientation='vertical' color='inherit' variant='outlined' size='large'>
          <Button sx={{padding:'1.5rem'}} onClick={()=>{navigate('/user-list')}}>Details of all Users</Button>
          <Button sx={{padding:'1.5rem'}} onClick={()=>{
            navigate('/book-list')
          }}>Details of all the Books</Button>
          </ButtonGroup>          
        </div>
      </div>)}
    </>
  )
}

export default AdminDash