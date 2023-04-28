import { Container, ImageList, Paper, ThemeProvider, createTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import Toast from '../componentes/Toast';
import Loading from '../componentes/Loading';
import ImageItem from '../componentes/ImageItem';
import WindowModal from '../componentes/WindowModal';
import { urlApi } from '../constantes/RoutersLinks';
import TextField from '../componentes/TextField';
import logo from '../css/img/Logo.svg';

import '../css/Odontologo.css';

const Odontologo = ({ tipo }) => {

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
            url: `/dibujos/${tipo}/${page}`
         })
            .then((res) => {
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
            <div className="logo">
               <img src={logo} alt="" />
            </div>
            <Paper className='paper-odontologo' elevation={2}>
               <TextField type={'h5'} align={'center'}>Participantes</TextField>

               <ImageList className='ImageList-dibujos'>
                  {data.map((item, index) => (
                     <div key={index}>
                        <ImageItem item={item} handleShow={handleShow} />
                     </div>
                  ))}
               </ImageList>

               <Loading open={loading} />

               <WindowModal show={show} handleClose={handleClose}>
                  <div className="content-img-modal">
                     <img className='img-modal' src={`${urlApi}/images/${imageModal.url}`} alt="" />
                  </div>
                  <TextField type={'subtitle1'}><b>Artista:</b> {imageModal.infantes}</TextField>
                  <TextField type={'caption'}><b>Acudiente:</b> {imageModal.padres}</TextField>
                  {imageModal.odontologo !== '- -' && <TextField type={'caption'}><b>Odontólogo:</b> {imageModal.odontologo}</TextField>}
               </WindowModal>
            </Paper>
         </Container>
      </ThemeProvider >
   );
};

export default Odontologo;