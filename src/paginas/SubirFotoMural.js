import React from 'react';
import TextField from '../componentes/TextField';
import InputFile from '../componentes/InputFile';

import { Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import { Toaster, toast } from 'react-hot-toast';
import Loading from '../componentes/Loading';

import '../css/SubirFotoMural.css';
import { MURAL } from '../constantes/Constantes';

const initialForm = {
   dibujos: []
}

const SubirFotoMural = ({ set_Check }) => {

   const { register, formState: { errors }, reset, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();

   const message_required = "Este campo es requerido";

   const onSubmit = (data) => {
      const config = {
         method: 'post',
         url: '/mural',
         formData: true
      }

      const formData = new FormData();
      const dibujos = data.dibujos[0];
      data.folder = "instituciones";

      formData.append('dibujos', dibujos);
      formData.append('data', JSON.stringify(data));

      api_handleSubmit(config, formData)
         .then((res) => {
            show_toast('success', res.data);
            reset(initialForm);
            set_Check(MURAL)
            localStorage.setItem(MURAL, 'true')
         })
         .catch((err) => {
            show_toast('error', err.data);
         })
   }

   const show_toast = (type, message) => {
      toast[type](message, {
         duration: 10000,
         position: 'top-center',
         style: {
            fontFamily: 'Regular'
         }
      })
   }

   return (
      <div className='SubirFotoMural'>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type={'body1'} align={'justify'}>Se debe subir una fotografía del mural que realizaron los estudiantes de la institución</TextField>

            <Alert severity="info">Solo se aceptan fotografías en formato JPG y PNG.</Alert>
            <br />

            <InputFile {...register('dibujos', {
               required: {
                  value: true,
                  message: message_required
               }
            })} accept={'image/png, image/jpeg'} color='secondary' label={"Subir la fotografía del mural"} name={'dibujos'} selectedFile={watch('dibujos')} error={errors.dibujos} />

            <div className='container-btn-submit'>
               <Button className='btn-submit' type='submit' variant="contained" color={'primary'}>
                  <b>Guardar</b>
               </Button>
            </div>
         </form>

         <Loading open={loading} />
         <Toaster />

      </div>
   );
};

export default SubirFotoMural;