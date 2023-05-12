import { Box, Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ExpandMoreRounded, CheckRounded, WarningRounded } from '@mui/icons-material';

import React, { useEffect, useState } from 'react';
import DocumentoFirmado from './DocumentoFirmado';
import SubirFotoMural from './SubirFotoMural';

import '../css/PublicInstituciones.css';
import CompNavBar from '../componentes/CompNavBar';
import TextField from '../componentes/TextField';
import { DOCENTE, MURAL, RECTOR } from '../constantes/Constantes';

const PublicInstituciones = () => {

   const [check, setCheck] = useState({
      docente: '',
      rector: '',
      mural: '',
   });

   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const set_Check = (rol) => {
      setCheck({
         ...check,
         [rol]: 'true'
      })
      setExpanded('false')
   }

   useEffect(() => {
      setCheck({
         [DOCENTE]: localStorage.getItem(DOCENTE),
         [RECTOR]: localStorage.getItem(RECTOR),
         [MURAL]: localStorage.getItem(MURAL)
      })

      if (localStorage.getItem(DOCENTE) !== 'true') {
         setExpanded(DOCENTE)
      } else if (localStorage.getItem(RECTOR) !== 'true') {
         setExpanded(RECTOR)
      } else if (localStorage.getItem(MURAL) !== 'true') {
         setExpanded(MURAL)
      } else {
         setExpanded('false')
      }
   }, []);

   return (
      <div className='PublicInstituciones'>

         <CompNavBar />
         <Container fixed>

            <TextField type={'h4'} align={'center'}>LEGALIZACIÓN PARA LA ACTIVIDAD DE MURALES EN LA INSTITUCIONES EDUCATIVAS - 2023</TextField>

            <Box>
               <Accordion disabled={check.docente === 'true' && true} expanded={expanded === DOCENTE} onChange={handleChange(DOCENTE)}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreRounded />}
                  >
                     {check.docente === 'true' ? <CheckRounded sx={{ color: '#00ff00' }} /> : <WarningRounded sx={{ color: '#ef7918' }} />}

                     <div className="text-accordion">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                           Docente
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>La información debe ser llenada por el docente líder a cargo</Typography>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails className='acordeon-general'>
                     <DocumentoFirmado set_Check={set_Check} rol={DOCENTE} />
                  </AccordionDetails>
               </Accordion>

               <Accordion disabled={check.docente !== 'true' ? true : check.rector === 'true'} expanded={expanded === RECTOR} onChange={handleChange(RECTOR)}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreRounded />}
                  >
                     {check.rector === 'true' ? <CheckRounded sx={{ color: '#00ff00' }} /> : <WarningRounded sx={{ color: '#ef7918' }} />}

                     <div className="text-accordion">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>Rector</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                           La información debe ser llenada por el rector(a) de la institución educativa
                        </Typography>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails className='acordeon-general'>
                     {expanded === RECTOR && <DocumentoFirmado set_Check={set_Check} rol={RECTOR} />}
                  </AccordionDetails>
               </Accordion>

               <Accordion disabled={check.rector !== 'true' ? true : check.mural === 'true'} expanded={expanded === MURAL} onChange={handleChange(MURAL)}>
                  <AccordionSummary
                     expandIcon={<ExpandMoreRounded />}
                  >
                     {check.mural === 'true' ? <CheckRounded sx={{ color: '#00ff00' }} /> : <WarningRounded sx={{ color: '#ef7918' }} />}

                     <div className="text-accordion">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                           Fotografía del mural
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>

                        </Typography>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails className='acordeon-general'>
                     <SubirFotoMural set_Check={set_Check} />
                  </AccordionDetails>
               </Accordion>

               {check.mural === 'true' &&
                  <div className="mensaje-final">
                     <TextField type={'h6'} align={'center'}>¡Gracias por haber participado en la actividad!</TextField>
                  </div>
               }


            </Box>
         </Container>
      </div>

   );
};

export default PublicInstituciones;