import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../componentes/TextField';
import InputSelect from '../componentes/InputSelect';
import InputText from '../componentes/InputText';
import { tipo_documento } from '../constantes/Selects';
import InputFile from '../componentes/InputFile';

import '../css/DocumentoFirmado.css';

import { Button, Paper, Alert, createTheme } from '@mui/material';
import { CheckRounded } from '@mui/icons-material';

const initialForm = {
   documento: {
      tipo: '',
      numero: '',
      lugar: ''
   },
   nombre: '',
   apellido: '',
   archivos: {
      firma: [],
      excel: []
   }
}

const DocumentoFirmado = ({ rol }) => {

   const { register, formState: { errors }, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const message_required = "Este campo es requerido";




   const onSubmit = (data) => {
      console.log(data);
   }

   return (

      <div className='DocumentoFirmado'>
         <form onSubmit={handleSubmit(onSubmit)}>
            <TextField type={'h5'} align={'center'}>DOCUMENTO LEGAL PARA LA ACTIVIDAD DE MURALES EN LA INSTITUCIÓN EDUCATIVA EN MAYO DE 2023</TextField>

            <InputSelect {...register('documento.tipo', {
               required: {
                  value: true,
                  message: message_required
               }
            })} value={watch('documento.tipo')} options={tipo_documento.acudiente} label={"Tipo de documento"} error={errors.documento?.tipo} />

            <InputText {...register('documento.numero', {
               required: {
                  value: true,
                  message: message_required
               },
               maxLength: {
                  value: 11,
                  message: "Se ha superado el límite máximo de 11 caracteres"
               }
            })} type={'number'} label={"Número de documento"} error={errors.documento?.numero} />

            <InputText {...register('documento.lugar_expedicion', {
               required: {
                  value: true,
                  message: message_required
               },
               maxLength: {
                  value: 45,
                  message: "Se ha superado el límite máximo de 45 caracteres"
               }
            })} required={true} label={"Lugar de expedición del documento"} error={errors.documento?.lugar_expedicion} />

            <InputText {...register('nombre', {
               required: {
                  value: true,
                  message: message_required
               },
               maxLength: {
                  value: 45,
                  message: "Se ha superado el límite máximo de 45 caracteres"
               }
            })} label={"Nombres"} error={errors.nombre} />

            <InputText {...register('apellido', {
               required: {
                  value: true,
                  message: message_required
               },
               maxLength: {
                  value: 45,
                  message: "Se ha superado el límite máximo de 45 caracteres"
               }
            })} label={"Apellidos"} error={errors.apellido} />


            {rol === 'docente' &&
               <div className='content-excel'>
                  <br />
                  <TextField type={'h6'} align={'center'}>Lista de participantes</TextField>
                  <TextField type={'body1'} align={'justify'}>A continuación, descargue la plantilla, escriba la información de los participantes de la actividad "Pinta un mural" y, posteriormente, suba aquí el archivo para continuar con el registro.</TextField>

                  <Alert severity="info">Solo se aceptan archivos en formato CSV.</Alert>
                  <br />

                  <div className="btn-excel">
                     <Button className='btn-submit' variant="outlined" color='secondary'>
                        <b>Descargar plantilla CSV</b>
                     </Button>

                     <InputFile {...register('archivos.excel', {
                        required: {
                           value: true,
                           message: message_required
                        }
                     })} accept={'.csv'} color='secondary' label={"Subir el archivo csv"} name={'archivos.excel'} selectedFile={watch('archivos.excel')} error={errors.acudiente?.firma} />
                  </div>

                  {watch('archivos.excel').length !== 0 &&
                     <div className='text-excel'>
                        <TextField type={'body2'} align={'justify'}><CheckRounded /> Se ha cargado correctamente el archivo</TextField>
                     </div>
                  }

               </div>
            }
            <br />

            <hr />

            <TextField type={'h6'} align={'center'}>AUTORIZACIÓN USO DE OBRA (MURAL)</TextField>
            <Paper elevation={3} className='autorizacion'>
               <TextField>
                  Señores <br />
                  COLGATE PALMOLIVE COMPAÑÍA <br />
                  NIT. 890.300.546-6 <br />
                  E.S.M.
               </TextField>

               {rol === 'docente' ?

                  <TextField>
                     Cordial saludo, por medio de la presente yo <b>{`${watch('nombre')} ${watch('apellido')}`}</b> identificado con <b>{watch('documento.tipo')}</b> No. <b>{watch('documento.numero')}</b>, docente del colegio ________________________, sede _______________, código DANE ______, me permito TRANSFERIR los derechos patrimoniales de la imagen del mural en cuya elaboración participé, y que trata el tema “Mundo de Sonrisas Sanas. Creciendo con hábitos saludables.”, a COLGATE PALMOLIVE COMPAÑÍA Nit 890.300.546-6 para que incluya en la página web <a href="https://www.pinta-un-mural-sbfb.col1.co">www.pinta-un-mural-sbfb.col1.co</a> y/o en el calendario de relaciones profesionales de esta empresa - 2024. Esta cesión se realiza a título gratuito por lo tanto COLGATE PALMOLIVE COMPAÑÍA no estará obligada a realizar ningún pago por este concepto y autorizo a esta empresa a realizar la recolección, almacenamiento, uso, circulación de mis datos personales y los de mi menor hijo, según la política de datos disponible en la página <a href="https://www.colgate.com.co">www.colgate.com.co</a>.  <br /> Atentamente,
                  </TextField>

                  :

                  <TextField>
                     Por medio de la presente yo <b>{`${watch('nombre')} ${watch('apellido')}`}</b> identificado con <b>{watch('documento.tipo')}</b> No. <b>{watch('documento.numero')}</b>, rector y representante legal del colegio ________________________, sede _______________, código DANE ______, autorizo a <b>COLGATE PALMOLIVE COMPAÑÍA Nit 890.300.546-6</b> para que incluya en la página web <a href="https://www.pinta-un-mural-sbfb.col1.co">www.pinta-un-mural-sbfb.col1.co</a> y/o en el calendario de relaciones profesionales de esta empresa - 2024, el mural realizado por los alumnos que a continuación se indican, el día _________________________, y que trata el tema “Mundo de Sonrisas Sanas. Creciendo con hábitos saludables.” Por este documento declaro que cuento con la debida autorización de los representantes de los menores para la participación de la obra en la celebración del “Día del Niño” de su empresa, y por lo tanto cuento con los derechos, cesiones y permisos para el uso y publicación de la obra exonerando a COLGATE PALMOLIVE COMPAÑÍA de cualquier reclamo sobre derechos de autor. Esta cesión se realiza a título gratuito por lo tanto COLGATE PALMOLIVE COMPAÑÍA no estará obligada a realizar ningún pago por este concepto y autorizo a esta empresa a realizar la recolección, almacenamiento, uso, circulación de mis datos personales y los de mi menor hijo, según la política de datos disponible en la página <a href="https://www.colgate.com.co">www.colgate.com.co</a>.  <br /> Atentamente,
                  </TextField>
               }

               <TextField type={'body1'} align={'justify'}>
                  <b>{`${watch('nombre')} ${watch('apellido')}`}</b>
               </TextField>
               <TextField type={'caption'} align={'justify'}>
                  {watch('documento.tipo').split(' ')[0]}. No. {watch('documento.numero')} <br />
                  de {watch('documento.lugar_expedicion')}
               </TextField>
               <br />
            </Paper>
            <br />
            <TextField type={'body1'} align={'justify'}>Se debe subir una fotografía legible y lo más cercana posible de la firma del {rol === 'docente' ? "Docente líder" : "Representante legal"} de la institución, para certificar la <b>Autorización de uso de la obra</b></TextField>

            <InputFile {...register('archivos.firma', {
               required: {
                  value: true,
                  message: message_required
               }
            })} accept={'image/png, image/jpeg'} color='secondary' label={"Subir la fotografía de la firma"} name={'archivos.firma'} selectedFile={watch('archivos.firma')} error={errors.acudiente?.firma} />

            <div className='container-btn-submit'>
               <Button className='btn-submit' type='submit' variant="contained" color={'primary'}>
                  <b>Guardar</b>
               </Button>
            </div>

         </form>
      </div>

   );
};

export default DocumentoFirmado;