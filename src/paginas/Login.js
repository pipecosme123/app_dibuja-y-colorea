import React from 'react';
import { useForm } from 'react-hook-form';
import { useApi } from '../hooks/useApi';
import TextField from '../componentes/TextField';
import { Button } from '@mui/material';
import InputText from '../componentes/InputText';
import Loading from '../componentes/Loading';
import { Toaster, toast } from 'react-hot-toast';

import imagen from '../css/img/Logo.svg';


import '../css/Login.css';
import { useAuthContext } from '../context/authContext';


const initialForm = {
   username: '',
   password: '',
}

const Login = () => {

   const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { login } = useAuthContext();
   const { loading, api_handleSubmit } = useApi();

   const message_required = "Este campo es requerido";

   const onSubmit = (data) => {

      const config = {
         method: 'get',
         url: '/login',
         formData: false,
         auth: {
            username: data.username,
            password: data.password
         }
      }

      api_handleSubmit(config)
         .then((res) => {

            const token = res.data.token;
            const info = res.data.data;

            localStorage.setItem('token', token);

            for (const property in info) {
               localStorage.setItem(property, info[property]);
            }

            login();

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
      <div className='Login'>
         <div className='content image'>
            <img src={imagen} alt="" />

         </div>

         <div className='content form'>

            <form onSubmit={handleSubmit(onSubmit)}>
               <TextField type={'h5'} align={'center'}>INICIAR SESIÓN</TextField>
               <TextField type={'h6'} align={'center'}>Instituciones educativas</TextField>

               <InputText {...register('username', {
                  required: {
                     value: true,
                     message: message_required
                  },
                  maxLength: {
                     value: 45,
                     message: "Se ha superado el límite máximo de 45 caracteres"
                  }
               })} required={true} label={"Usuario"} error={errors.username} />

               <InputText {...register('password', {
                  required: {
                     value: true,
                     message: message_required
                  },
                  maxLength: {
                     value: 45,
                     message: "Se ha superado el límite máximo de 45 caracteres"
                  }
               })} type={'password'} required={true} label={"Contraseña"} error={errors.password} />

               <div className='container-btn-submit'>
                  <Button className='btn-submit' type='submit' variant="contained" color={'primary'}>
                     <b>Iniciar sesión</b>
                  </Button>
               </div>
            </form>

            <Loading open={loading} />
            <Toaster />

         </div>
         <div></div>
      </div>
   );
};

export default Login;