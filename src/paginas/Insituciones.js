import React from 'react';
import logo from '../css/img/Logo.svg';
import mural from '../css/img/Imagen_BG_smile.png';

import '../css/Insituciones.css';

const Insituciones = () => {

   window.document.title = 'Visualizaciones - Pinta un mural';

   return (
      <div className='Insituciones'>
         <div className="logo">
            <img src={logo} alt="" />
         </div>
         <div className="content">
            <img className='mural' src={mural} alt="" />
            <h4>Las fotos de los murales se comenzarán a subir a partir del día <b>08 de mayo</b></h4>
         </div>
      </div>
   );
};

export default Insituciones;