import { Box, Container, Accordion, AccordionSummary, AccordionDetails, Typography, ThemeProvider, createTheme } from '@mui/material';
import { ExpandMore, CheckRounded } from '@mui/icons-material';

import React, { useState } from 'react';
import DocumentoFirmado from './DocumentoFirmado';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from '../constantes/RoutersLinks';

const PublicInstituciones = () => {

   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const theme = createTheme({
      palette: {
         primary: {
            main: '#27d2f0',
         },
         secondary: {
            main: '#82bb00',
         },
         third: {
            main: '#d2010d',
         }
      },
      overrides: {
         MuiInput: {
            underline: {
               '&:before': {
                  borderBottom: '2px solid rgba(0, 0, 0, 0.42)',
               },
               '&:hover:not($disabled):before': {
                  borderBottom: `2px solid #27d2f0`,
               },
               '&:after': {
                  borderBottom: `2px solid #27d2f0`,
               },
            },
         },
      },
      typography: {
         fontFamily: ["Light", "Regular", "Bold"].join(',')
      },
   });

   return (
      <ThemeProvider theme={theme}>
         <div className='PublicInstituciones'>
            <Container fixed>
               <Box>
                  Pagina de instituciones


                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                     >
                        <CheckRounded />
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                           General settings
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                        <DocumentoFirmado rol={'docente'} />
                     </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                     >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                           You are currently not an owner
                        </Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                        <DocumentoFirmado rol={'rector'} />
                     </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                     <AccordionSummary
                        expandIcon={<ExpandMore />}
                     >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                           Advanced settings
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                           Filtering has been entirely disabled for whole web server
                        </Typography>
                     </AccordionSummary>
                     <AccordionDetails>
                        <Typography>
                           Foto
                        </Typography>
                     </AccordionDetails>
                  </Accordion>
               </Box>


               {/* <DocumentoFirmado /> */}

            </Container>
         </div>
      </ThemeProvider>
   );
};

export default PublicInstituciones;