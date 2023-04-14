import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

import '../css/inputSelect.css';

const InputSelect = React.forwardRef(({ options, required, onChange, onBlur, name, label, error }, ref) => {

   options.unshift({
      id: 0,
      value: "Seleccionar una opción"
   })

   return (
      <FormControl
         className='InputSelect'
         variant="standard"
         required={required}
         sx={{ m: 1, minWidth: 120 }}
         error={error && true}
      >
         <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
         <Select
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
         >
            {options.map((item, index) => (
               <MenuItem disabled={item.id === 0 && true} key={index} value={item.id}>{item.value}</MenuItem>
            ))}
         </Select>
         {error && <FormHelperText>Error</FormHelperText>}
      </FormControl>
   )
});

export default InputSelect;