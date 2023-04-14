import React from 'react';
import { useForm } from 'react-hook-form';
import { Paper } from '@mui/material';

import InputText from '../componentes/InputText';
import InputSelect from '../componentes/InputSelect';
import { tipo_documento } from '../constantes/Selects';
import InputFile from '../componentes/InputFile';
import TextField from '../componentes/TextField';

import '../css/Formulario.css';

const initialForm = {
   paciente: {
      tipo_documento: '0',
      no_documento: '',
      nombre: '',
      apellido: '',
      dibujo: [],
   },
   acudiente: {
      nombre: '',
      apellido: '',
      celular: '',
   },
   odontologo: {
      nombre: '',
      apellido: '',
      celular: '',
   }
}

const Formulario = () => {

   const { register, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const message_required = "Este campo es requerido"

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className='Formulario'>
         <Paper className='paper-form' elevation={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <TextField type={'h5'}>Formulario de inscripción</TextField>
               <div className='container'>
                  <TextField type={'h6'}>Información del niño(a)</TextField>
                  <InputSelect {...register('paciente.tipo_documento')} options={tipo_documento} required={true} label={"Tipo de documento"} />
                  <InputText {...register('paciente.no_documento')} type={'number'} required={true} label={"Número de documento"} />
                  <InputText {...register('paciente.nombre', {
                     required: {
                        value: true,
                        message: message_required
                     }
                  })} label={"Nombres"} />
                  <InputText {...register('paciente.apellido')} required={true} label={"Apellidos"} />
               </div>
               <div className='container'>
                  <TextField type={'h6'}>Información del acudiente</TextField>
                  <InputText {...register('acudiente.nombre')} required={true} label={"Nombres:"} />
                  <InputText {...register('acudiente.apellido')} required={true} label={"Apellidos:"} />
                  <InputText {...register('acudiente.celular')} type={'number'} required={true} label={"Celular:"} />
               </div>
               <div className='container'>
                  <TextField type={'h6'}>Información del odontólogo</TextField>
                  <InputText {...register('odontologo.nombre')} required={true} label={"Nombres:"} />
                  <InputText {...register('odontologo.apellido')} required={true} label={"Apellidos:"} />
                  <InputText {...register('odontologo.celular')} type={'number'} required={true} label={"Celular:"} />
                  {/* <InputSelect /> */}
               </div>

               <div className='container'>
                  <TextField type={'h6'}>Fotografia del dibujo del niño(a)</TextField>
                  <InputFile required={true} name={'paciente.dibujo'} />
                  {/* <InputText {...register('paciente.dibujo')} accept={'image/png, image/jpeg'} type={'file'} required={true} label={"Fotografia del dibujo del niño(a):"} /> */}
                  {/* {watch(("paciente.dibujo", { name, type }) => console.log(value, name, type))} */}
                  {/*{...register("paciente.dibujo", { required: true })} */}


               </div>
               <input type='submit' />
            </form>
         </Paper>
      </div>
   );
};

export default Formulario;