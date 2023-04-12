import React from 'react';

const InputText = React.forwardRef(({ type, required, onChange, onBlur, name, label }, ref) => (
   <div className='InputText'>
      <label htmlFor={name}>
         {required && <span className='required'>*</span>}
         {label}
      </label>
      <input
         ref={ref}
         type={type ? type : 'text'}
         id={name}
         name={name}
         required={required}
         onChange={onChange}
         onBlur={onBlur}
      />
   </div>
));

export default InputText;