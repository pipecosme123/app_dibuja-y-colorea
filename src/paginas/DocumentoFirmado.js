import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '../componentes/TextField';
import InputSelect from '../componentes/InputSelect';
import InputText from '../componentes/InputText';
import { tipo_documento } from '../constantes/Selects';
import InputFile from '../componentes/InputFile';

import '../css/DocumentoFirmado.css';

import { Button, Paper, Alert } from '@mui/material';
import { CheckRounded } from '@mui/icons-material';
import { urlApi } from '../constantes/RoutersLinks';
import { Toaster, toast } from 'react-hot-toast';
import Loading from '../componentes/Loading';
import { useApi } from '../hooks/useApi';
import TablaDatos from '../componentes/TablaDatos';
import { DOCENTE, MURAL, RECTOR } from '../constantes/Constantes';

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
   },
   fecha: ''
}

const DocumentoFirmado = ({ set_Check, rol }) => {

   const { register, formState: { errors }, reset, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const [datos, setdatos] = useState([]);

   const { loading, api_handleSubmit } = useApi();

   const message_required = "Este campo es requerido";

   const onSubmit = (data) => {

      const config = {
         method: 'post',
         url: '/legal_directivos',
         formData: true
      }

      const formData = new FormData();
      const firma = data.archivos.firma[0];
      data.folder = "instituciones";
      data.rol = rol;
      data.documento.tipo = data.documento.tipo.split(' ')[0];
      delete data.archivos.firma;
      delete data.check;

      if (rol === DOCENTE) {
         const alumnos = data.archivos.excel[0];
         formData.append('alumnos', alumnos);
         delete data.archivos.excel;
      }

      formData.append('firmas', firma);
      formData.append('data', JSON.stringify(data));

      api_handleSubmit(config, formData)
         .then((res) => {

            console.log(res);
            show_toast('success', res.data);
            reset(initialForm);
            set_Check(rol)
            localStorage.setItem(rol, 'true');
         })
         .catch((err) => {
            show_toast('error', err.data);
         })

   }

   useEffect(() => {

      const getdata = () => {
         const config = {
            method: 'get',
            url: '/participantes',
            formData: false
         }

         api_handleSubmit(config)
            .then((res) => {
               setdatos(res.data);
               console.log(res.data);
            })
            .catch((err) => {
               show_toast('error', err.data);
            })
      }

      if (rol === RECTOR) {
         getdata();
      }

   }, [rol]);

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

            <InputText {...register('documento.lugar', {
               required: {
                  value: true,
                  message: message_required
               },
               maxLength: {
                  value: 45,
                  message: "Se ha superado el límite máximo de 45 caracteres"
               }
            })} required={true} label={"Lugar de expedición del documento"} error={errors.documento?.lugar} />

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

            {rol === DOCENTE &&
               <div className='content-excel'>
                  <br />
                  <TextField type={'h6'} align={'center'}>Lista de participantes</TextField>
                  <TextField type={'body1'} align={'justify'}>A continuación, descargue la plantilla, escriba la información de los participantes de la actividad "Pinta un mural" y, posteriormente, suba aquí el archivo para continuar con el registro.</TextField>

                  <Alert severity="info">Solo se aceptan archivos en formato xlsx (Excel).</Alert>
                  <br />

                  <div className="btn-excel">
                     <a href={`${urlApi}/plantilla`} target='blank'>
                        <Button className='btn-submit' variant="outlined" color='secondary'>
                           <b>Descargar plantilla</b>
                        </Button>
                     </a>

                     <InputFile {...register('archivos.excel', {
                        required: {
                           value: true,
                           message: message_required
                        }
                     })} accept={'.xlsx'} color='secondary' label={"Subir el archivo excel"} name={'archivos.excel'} selectedFile={watch('archivos.excel')} error={errors.acudiente?.firma} />
                  </div>

                  {watch('archivos.excel').length !== 0 &&
                     <div className='text-excel'>
                        <TextField type={'body2'} align={'justify'}><CheckRounded /> Se ha cargado correctamente el archivo</TextField>
                     </div>
                  }

               </div>
            }
            <br />

            {rol === RECTOR &&
               <div>
                  <TextField type={'h6'} align={'center'}>Lista de participantes</TextField>
                  <TextField type={'body1'} align={'justify'}>A continuación se presenta la lista de los niños(a) que van a participar de la actividad <b>"Pinta un mural con el Dr. Muelitas"</b></TextField>
                  <TablaDatos datos={datos} />
               </div>
            }

            <hr />

            <TextField type={'h6'} align={'center'}>AUTORIZACIÓN USO DE OBRA (MURAL)</TextField>
            <Paper elevation={3} className='autorizacion'>
               <TextField type={'body2'}>
                  Señores <br />
                  COLGATE PALMOLIVE COMPAÑÍA <br />
                  NIT. 890.300.546-6 <br />
                  E.S.M.
               </TextField>

               {rol === DOCENTE ?
                  <>
                     <TextField type={'body1'} align={'center'}> <b>REF: AUTORIZACIÓN USO DE OBRA  (MURAL)</b> </TextField>
                     <br />
                     <TextField type={'body2'} align={'justify'}>
                        Cordial saludo, por medio de la presente, yo <b>{`${watch('nombre')} ${watch('apellido')}`}</b> identificado con <b>{watch('documento.tipo')}</b> No. <b>{watch('documento.numero')}</b>, docente del colegio <b className='info'>{localStorage.getItem('nombre')}</b>, sede <b className='info'>{localStorage.getItem('sede')}</b>, código DANE <b className='info'>{localStorage.getItem('codigo_dane')}</b>, me permito TRANSFERIR los derechos patrimoniales de la imagen del mural en cuya elaboración participé, y que trata el tema “Mundo de Sonrisas Sanas. Creciendo con hábitos saludables.”, a COLGATE PALMOLIVE COMPAÑÍA Nit 890.300.546-6 para que incluya en la página web <a href="https://www.pinta-un-mural-sbfb.col1.co">www.pinta-un-mural-sbfb.col1.co</a> y/o en el calendario de relaciones profesionales de esta empresa - 2024. Esta cesión se realiza a título gratuito por lo tanto COLGATE PALMOLIVE COMPAÑÍA no estará obligada a realizar ningún pago por este concepto y autorizo a esta empresa a realizar la recolección, almacenamiento, uso, circulación de mis datos personales y los de mi menor hijo, según la política de datos disponible en la página <a href="https://www.colgate.com.co">www.colgate.com.co</a>.  <br /> Atentamente,
                     </TextField>
                  </>

                  :
                  <>
                     <TextField type={'body1'} align={'center'}> <b>REF: AUTORIZACIÓN USO DE OBRA  (MURAL) y TRATAMIENTO DATOS PERSONALES DE LOS MENORES</b> </TextField>
                     <br />
                     <TextField type={'body2'} align={'justify'}>
                        Por medio de la presente, yo <b>{`${watch('nombre')} ${watch('apellido')}`}</b> identificado con <b>{watch('documento.tipo')}</b> No. <b>{watch('documento.numero')}</b>, rector y representante legal del colegio <b className='info'>{localStorage.getItem('nombre')}</b>, sede <b className='info'>{localStorage.getItem('sede')}</b>, código DANE <b className='info'>{localStorage.getItem('codigo_dane')}</b>, AUTORIZO a <b>COLGATE PALMOLIVE COMPAÑÍA Nit 890.300.546-6</b> para que incluya en la página web <a href="http://www.pinta-un-mural-sbfb.col1.co" target="_blank" rel="noopener noreferrer">www.pinta-un-mural-sbfb.col1.co</a> y/o en el calendario de relaciones profesionales de esta empresa – 2024, el mural realizado por los alumnos que a continuación se indican, y que trata el tema “Mundo de Sonrisas Sanas. Creciendo con hábitos saludables.” Por este documento declaro que cuento con la debida autorización de los representantes de los menores para la participación de la obra en la celebración del “Día del Niño” de su empresa, y por lo tanto cuento con los derechos, cesiones y permisos para el uso y publicación de la obra exonerando a COLGATE PALMOLIVE COMPAÑÍA de cualquier reclamo sobre derechos de autor. Esta cesión se realiza a título gratuito por lo tanto COLGATE PALMOLIVE COMPAÑÍA no estará obligada a realizar ningún pago por este concepto. Así mismo manifiesto que cuento con la autorización de realizar la recolección, almacenamiento, uso, circulación de los datos personales otorgados por los padres o acudientes en representación de los estudiantes según la política de datos disponible en la página <a href="http://www.colgate.com.co" target="_blank" rel="noopener noreferrer">www.colgate.com.co</a>.
                        <br />
                        Autorizo a esta empresa a realizar la recolección, almacenamiento, uso, circulación de mis datos personales, según la política de datos disponible en la página <a href="http://www.colgate.com.co" target="_blank" rel="noopener noreferrer">www.colgate.com.co</a>.
                        <br /> Atentamente,
                     </TextField>
                  </>
               }

               <TextField type={'body1'} align={'justify'}>
                  <b>{`${watch('nombre')} ${watch('apellido')}`}</b>
               </TextField>
               <TextField type={'caption'} align={'justify'}>
                  {watch('documento.tipo').split(' ')[0]}. No. {watch('documento.numero')} <br />
                  de {watch('documento.lugar')}
               </TextField>
               <br />
            </Paper>

            <br />
            <TextField type={'body1'} align={'justify'}>Se debe subir una fotografía legible y lo más cercana posible de la firma del {rol === DOCENTE ? "Docente líder" : "Representante legal"} de la institución, para certificar la <b>Autorización de uso de la obra</b></TextField>

            <Alert severity="info">Solo se aceptan fotografías en formato JPG y PNG.</Alert>
            <br />

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

         <Loading open={loading} />
         <Toaster />
      </div>

   );
};

export default DocumentoFirmado;