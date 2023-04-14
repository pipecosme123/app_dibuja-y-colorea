import { Button, Typography } from '@mui/material';
import React from 'react';

const InputFile = React.forwardRef(({ required, onChange, onBlur, name, errors, nameImage }, ref) => (
   <div className='InputFile'>
      <Button variant="contained" component="label">
         Seleccionar imagen
         <input
            ref={ref}
            name={name}
            type="file"
            required={required}
            accept={'image/png, image/jpeg'}
            onChange={onChange}
            onBlur={onBlur}
            style={{ display: "none" }}
         />
      </Button>
      {/* {errors && <p>Debes seleccionar una imagen</p>} */}

      {nameImage && <Typography variant="body1" gutterBottom>
         {nameImage}
      </Typography>}

   </div>
));

export default InputFile;