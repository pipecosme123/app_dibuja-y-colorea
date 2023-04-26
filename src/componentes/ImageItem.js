import React from 'react';
import { ImageListItem } from '@mui/material';
// import ItemNameBar from './ItemNameBar';
import { urlApi } from '../constantes/RoutersLinks';

import '../css/ImageItem.css';

const ImageItem = ({ key, item, handleShow }) => {

   return (
      <ImageListItem key={key} className='ImageListItem' onClick={() => handleShow(item)}>
         <img
            src={`${urlApi}/images/${item.url}`}
            alt={''}
            loading="lazy"
         />
         {/* <ItemNameBar item={item} /> */}
      </ImageListItem>
   );
};

export default ImageItem;