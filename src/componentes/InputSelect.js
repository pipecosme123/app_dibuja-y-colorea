import React from 'react';

const InputSelect = React.forwardRef(({ options, required, disabled, onChange, onBlur, name, label }, ref) => (
   <div className='InputSelect'>
      <label htmlFor={name}>
         {required && <span className='required'>*</span>}
         {label}
      </label>
      <select
         name={name}
         disabled={disabled}
         onChange={onChange}
         onBlur={onBlur}
         defaultValue={0}
      >
         {options.map((item, index) => (
            <option disabled={item.id === 0 && true} key={index} value={item.id}></option>
         ))}
      </select>
   </div>
));

export default InputSelect;