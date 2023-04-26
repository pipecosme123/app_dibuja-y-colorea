import { Container, ImageList, Paper, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import Toast from '../componentes/Toast';
import Loading from '../componentes/Loading';
import ImageItem from '../componentes/ImageItem';
import WindowModal from '../componentes/WindowModal';
import { urlApi } from '../constantes/RoutersLinks';
import TextField from '../componentes/TextField';

import '../css/Odontologo.css';

const Odontologo = () => {

   window.document.title = 'Incripciones - Dibuja y Colorea';

   const [show, setShow] = useState(false);
   const [imageModal, setImageModal] = useState('');

   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);

   const { loading, api_handleSubmit } = useApi();

   const handleShow = (data) => {
      setImageModal(data);
      setShow(true);
   }

   const handleClose = () => {
      setImageModal('');
      setShow(false);
   }

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

   useEffect(() => {
      const get_data = () => {
         api_handleSubmit({
            method: 'get',
            url: `/dibujos/${page}`
         })
            .then((res) => {
               console.log(res.data);
               setData(res.data)
            })
            .catch((err) => {
               <Toast title="¡Error!" message={err.data} />
            })
      }

      get_data();
   }, [page]);

   return (
      <ThemeProvider theme={theme}>
         <Container fixed className='Odontologo'>
            <Paper className='paper-odontologo' elevation={2}>
               <TextField type={'h5'} align={'center'}>Participantes</TextField>

               <ImageList cols={5}>
                  {data.map((item, index) => (
                     <ImageItem key={index} item={item} handleShow={handleShow} />
                  ))}
               </ImageList>

               <Loading open={loading} />

               <WindowModal show={show} handleClose={handleClose}>
                  <TextField type={'h5'} align={'center'}>Mi dibujo</TextField>
                  <img className='img-modal' src={`${urlApi}/images/${imageModal.url}`} alt="" />
                  <TextField type={'subtitle1'}>Artista: {imageModal.infantes}</TextField>
                  <TextField type={'caption'}>Acudiente: {imageModal.padres}</TextField>
                  <TextField type={'caption'}>Odontólogo: {imageModal.odontologo}</TextField>
               </WindowModal>
            </Paper>
         </Container>
      </ThemeProvider >
   );
};

export default Odontologo;