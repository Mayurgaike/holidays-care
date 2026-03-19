import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = '917666642587'; 
    const message = 'Hello! I would like to know more about your tour packages.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Tooltip title="Chat with us on WhatsApp" placement="left">
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: 70,
          width: 70,  
          
          bgcolor: '#25D366',
          '&:hover': {
            bgcolor: '#128b45',
          },
          zIndex: 1000,
        }}
      >
        <WhatsAppIcon sx={{ fontSize: 40 }} />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
