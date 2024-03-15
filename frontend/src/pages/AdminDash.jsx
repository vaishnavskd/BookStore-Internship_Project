import React from 'react'
import AdminNav from '../components/AdminNav'
import { Button, ButtonGroup } from '@mui/material'
import styles from '../assets/css/Admin.module.css'
const AdminDash = () => {
  return (
    <>
      <AdminNav />
      <div className={styles.mainContainer}>
        <div>
          <ButtonGroup orientation='vertical' color='inherit' variant='outlined' size='large'>
          <Button sx={{padding:'1.5rem'}}>Details of all Users</Button>
          <Button sx={{padding:'1.5rem'}}>Details of all the Books</Button>
          </ButtonGroup>          
        </div>
      </div>
    </>
  )
}

export default AdminDash