import React from 'react';
import { Container, Button, Paper } from '@mui/material';
import TextField from './TextField';
import logo from '../css/img/Logo.svg';

import '../css/CompNavBar.css';
import { useAuthContext } from '../context/authContext';

const CompNavBar = () => {

   const { logout } = useAuthContext();

   return (
      <Paper elevation={1} className='CompNavBar'>
         <Container className='Container-Nav'>
            <div className='logo'>
               <img className='img-logo' src={logo} alt="" />
               <div className='institucion'>
               <TextField>{localStorage.getItem('nombre')} - {localStorage.getItem('sede')}</TextField>
               </div>
            </div>
            <div className='btn-cerrar'>
               <Button variant="outlined" color="error" onClick={logout}>Cerrar Sesión</Button>
            </div>
         </Container>
      </Paper>
   );
};

export default CompNavBar;