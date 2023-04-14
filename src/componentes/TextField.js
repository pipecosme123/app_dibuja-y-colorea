import { Typography } from '@mui/material';
import React from 'react';


import '../css/TextField.css';

const TextField = ({ children, type }) => {
   return (
      <Typography className='TextField' variant={type} gutterBottom>
         {children}
      </Typography>
   );
};

export default TextField;