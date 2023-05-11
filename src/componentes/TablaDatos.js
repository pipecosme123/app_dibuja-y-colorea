import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TablaDatos = ({ datos }) => {
   return (
      <div className='TablaDatos'>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell><b>N°</b></TableCell>
                     <TableCell><b>Tipo de identificación</b></TableCell>
                     <TableCell><b>Número de identificación</b></TableCell>
                     <TableCell><b>Nombres</b></TableCell>
                     <TableCell><b>Apellidos</b></TableCell>
                     <TableCell><b>Edad</b></TableCell>
                     <TableCell><b>Grado de escolaridad</b></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {datos.map((row, index) => (
                     <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row['Tipo de identificación']}</TableCell>
                        <TableCell>{row['Número de identificación']}</TableCell>
                        <TableCell>{row['Nombres']}</TableCell>
                        <TableCell>{row['Apellidos']}</TableCell>
                        <TableCell>{row['Edad']}</TableCell>
                        <TableCell>{row['Grado de escolaridad']}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default TablaDatos;