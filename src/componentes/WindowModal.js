import { Box, Modal } from '@mui/material';
import React from 'react';

import '../css/WindowModal.css';

const WindowModal = ({ show, handleClose, children }) => {

   return (
      <Modal
         open={show}
         onClose={handleClose}
         className='WindowModal'
      >
         <Box className='box-WindowModal'>
            {children}
         </Box>
      </Modal>
   );
};

export default WindowModal;