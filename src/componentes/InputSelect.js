import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

import '../css/inputSelect.css';

const InputSelect = React.forwardRef(({ options, value, onChange, onBlur, name, label, error }, ref) => {
   return (
      <FormControl
         className='InputSelect'
         variant="standard"
         sx={{ m: 1, minWidth: 120 }}
         error={error && true}
      >
         <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
         <Select
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
         >
            <MenuItem disabled={true} value={0}>{"Seleccionar una opción"}</MenuItem>
            {options.map((item, index) => (
               <MenuItem disabled={item.id === 0 && true} key={index} value={item.id}>{item.value}</MenuItem>
            ))}
         </Select>
         {error && <FormHelperText error>{error.message}</FormHelperText>}
      </FormControl>
   )
});

export default InputSelect;