import React from 'react';
import { useForm } from 'react-hook-form';

import InputText from '../componentes/InputText';
// import InputSelect from '../componentes/InputSelect';

import '../css/Formulario.css';

const Formulario = () => {

   const { register, handleSubmit } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className='Formulario'>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div>
               <h1>Información del niño(a)</h1>
               <InputText {...register('paciente.nombre')} required={true} label={'Nombres'} />
               <InputText {...register('paciente.apellido')} required={true} label={'Apellidos'} />
            </div>
            <div>
               <h1>Información del acudiente</h1>
               <InputText {...register('acudiente.nombre')} required={true} label={'Nombres:'} />
               <InputText {...register('acudiente.apellido')} required={true} label={'Apellidos:'} />
               <InputText {...register('acudiente.celular')} type={'number'} required={true} label={'Celular:'} />
            </div>
            <div>
               <h1>Información del odontólogo</h1>
               <InputText {...register('odontologo.nombre')} required={true} label={'Nombres:'} />
               <InputText {...register('odontologo.apellido')} required={true} label={'Apellidos:'} />
               <InputText {...register('odontologo.celular')} type={'number'} required={true} label={'Celular:'} />
               {/* <InputSelect /> */}
               
               <InputText {...register('odontologo.celular')} type={'file'} required={true} label={'Fotografia del dibujo del niño:'} />

            </div>
            <input type='submit' />
         </form>
      </div>
   );
};

export default Formulario;