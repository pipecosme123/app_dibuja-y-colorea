import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, FormControlLabel, Paper, ThemeProvider, createTheme } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';

import InputText from '../componentes/InputText';
import InputSelect from '../componentes/InputSelect';
import InputFile from '../componentes/InputFile';
import TextField from '../componentes/TextField';
import Loading from '../componentes/Loading';

import { tipo_documento } from '../constantes/Selects';

import principal from '../css/img/img_principal.png';

import '../css/fonts.css';
import '../css/Formulario.css';
import { useApi } from '../hooks/useApi';

const initialForm = {
   paciente: {
      tipo_documento: '',
      no_documento: '',
      nombre: '',
      apellido: '',
      dibujo: [],
   },
   acudiente: {
      nombre: '',
      apellido: '',
      celular: '',
      correo: ''
   },
   odontologo: {
      nombre: '',
      apellido: '',
      celular: '',
   },
   check: false
}

const Formulario = ({ colaborador }) => {

   window.document.title = 'Incripciones - Dibuja y Colorea';

   const { register, formState: { errors }, watch, reset, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();

   const message_required = "Este campo es requerido";
   const selectedFile = watch('paciente.dibujo');

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

   const onSubmit = (data) => {

      const config = {
         method: 'post',
         url: '/form',
         formData: true
      }

      const formData = new FormData();
      const fotografia = data.paciente.dibujo[0];
      data.folder = colaborador ? 'empleados' : 'odontologos';
      delete data.paciente.dibujo;
      delete data.check;

      formData.append('image', fotografia);
      formData.append('data', JSON.stringify(data));

      api_handleSubmit(config, formData)
         .then((res) => {
            show_toast('success', res.data);
            reset(initialForm);
         })
         .catch((err) => {

            show_toast('error', err.data);

            if (err.status === 409) {
               reset(initialForm);
            }
         })
   };

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
      <div className='Formulario'>
         <div className='portada'>
            <img src={principal} className='img-formulario' alt="" />
            <div className="titulo">
               <TextField type={'h3'} align={'center'}>ACTIVIDAD DIBUJA Y COLOREA</TextField>
               <TextField type={'h4'} align={'center'}>con el Dr. Muelitas</TextField>
            </div>
         </div>
         <ThemeProvider theme={theme}>
            <Paper className='paper-form' elevation={2}>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField type={'h5'} align={'center'}>Formulario de inscripción</TextField>
                  <div className='container'>
                     <TextField type={'h6'} align={'center'}>Información del niño(a)</TextField>

                     <InputSelect {...register('paciente.tipo_documento', {
                        required: {
                           value: true,
                           message: message_required
                        }
                     })} value={watch('paciente.tipo_documento')} options={tipo_documento} label={"Tipo de documento"} error={errors.paciente?.tipo_documento} />

                     <InputText {...register('paciente.no_documento', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 11,
                           message: "Se ha superado el límite máximo de 11 caracteres"
                        }
                     })} type={'number'} label={"Número de documento"} error={errors.paciente?.no_documento} />

                     <InputText {...register('paciente.nombre', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 45,
                           message: "Se ha superado el límite máximo de 45 caracteres"
                        }
                     })} label={"Nombres"} error={errors.paciente?.nombre} />

                     <InputText {...register('paciente.apellido', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 45,
                           message: "Se ha superado el límite máximo de 45 caracteres"
                        }
                     })} label={"Apellidos"} error={errors.paciente?.apellido} />
                  </div>

                  <div className='container'>
                     <TextField type={'h6'} align={'center'}>Información del acudiente</TextField>
                     <InputText {...register('acudiente.nombre', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 45,
                           message: "Se ha superado el límite máximo de 45 caracteres"
                        }
                     })} required={true} label={"Nombres"} error={errors.acudiente?.nombre} />

                     <InputText {...register('acudiente.apellido', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 45,
                           message: "Se ha superado el límite máximo de 45 caracteres"
                        }
                     })} required={true} label={"Apellidos"} error={errors.acudiente?.apellido} />

                     <InputText {...register('acudiente.celular', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        maxLength: {
                           value: 10,
                           message: "Se ha superado el límite máximo de 10 caracteres"
                        }
                     })} type={'number'} required={true} label={"Teléfono Celular"} error={errors.acudiente?.celular} />

                     <InputText {...register('acudiente.correo', {
                        required: {
                           value: true,
                           message: message_required
                        },
                        pattern: {
                           value: /^([\da-z_-]+)@([\da-z-]+)\.([a-z]{2,6})$/,
                           message: 'Ingrese un correo electrónico válido'
                        },
                        maxLength: {
                           value: 45,
                           message: "Se ha superado el límite máximo de 80 caracteres"
                        }
                     })} type={'email'} required={true} label={"Correo Electrónico"} error={errors.acudiente?.correo} />

                  </div>

                  {!colaborador &&
                     <div className='container'>
                        <TextField type={'h6'} align={'center'}>Información del odontólogo</TextField>
                        <InputText {...register('odontologo.nombre', {
                           required: {
                              value: true,
                              message: message_required
                           },
                           maxLength: {
                              value: 45,
                              message: "Se ha superado el límite máximo de 45 caracteres"
                           }
                        })} label={"Nombres"} error={errors.odontologo?.nombre} />

                        <InputText {...register('odontologo.apellido', {
                           required: {
                              value: true,
                              message: message_required
                           },
                           maxLength: {
                              value: 45,
                              message: "Se ha superado el límite máximo de 45 caracteres"
                           }
                        })} label={"Apellidos"} error={errors.odontologo?.apellido} />

                        <InputText {...register('odontologo.celular', {
                           required: {
                              value: true,
                              message: message_required
                           },
                           maxLength: {
                              value: 10,
                              message: "Se ha superado el límite máximo de 10 caracteres"
                           }
                        })} type={'number'} label={"Teléfono celular"} error={errors.odontologo?.celular} />

                        {/* <InputSelect /> */}
                     </div>
                  }

                  <div className='container'>
                     <TextField type={'h6'} align={'center'}>Fotografía del dibujo del niño(a)</TextField>
                     <TextField type={'body2'}>Se debe subir una fotografía del dibujo realizado por su niño(a):</TextField>
                     <TextField type={'caption'}>Únicamente se acepta la fotografía en formato <i>.jpg</i> y <i>.png</i></TextField>
                     <InputFile {...register('paciente.dibujo', {
                        required: {
                           value: true,
                           message: message_required
                        }
                     })} filename={watch('paciente.dibujo')} name={'paciente.dibujo'} selectedFile={selectedFile} error={errors.paciente?.dibujo} />

                  </div>
                  <hr />
                  <div>
                     <TextField type={'body1'} align={'center'}><b>Políticas de recolección y uso de datos personales</b></TextField>
                     <TextField type={'body2'} align={'justify'}>Autorizo la recolección, almacenamiento, uso, tratamiento, y transmisión internacional o a terceros de mis datos personales por parte de <b>COLGATE PALMOLIVE COMPAÑÍA</b> con <b>NIT 890.300.546-6</b>, con el fin de recibir información sobre sus productos, campañas publicitarias y promociones , hacer parte de sus actividades para profesionales de la salud y recibir información comercial especializada de la misma. Esto de acuerdo a lo establecido en la Ley 1581 de 2012 y el decreto 377 de 2013, y conforme a la política de datos personales disponible en <a href="https://www.colgatepalmolive.com.co/legal-privacy-policy" target="_blank" rel="noopener noreferrer"><i><u>https://www.colgatepalmolive.com.co/legal-privacy-policy</u></i></a>. Entendiendo que puedo solicitar la modificación o supresión de mis datos personales en cualquier momento.</TextField>

                     <div className="form-check">
                        <FormControlLabel control={<Checkbox checked={watch('check')} {...register('check')} />} label={"Si autorizo la recolección y uso de mis datos personales"} />
                     </div>
                  </div>
                  <div className='container-btn-submit'>
                     <Button className='btn-submit' type='submit' variant="contained" disabled={!watch('check')}>
                        Inscribir
                     </Button>
                  </div>
                  {/* <input type='submit' /> */}
               </form>
            </Paper>
         </ThemeProvider>
         <Loading open={loading} />
         <Toaster />
      </div>
   );
};

export default Formulario;