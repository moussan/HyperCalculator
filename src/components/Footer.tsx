import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ mt: 4, py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Einstein Calculator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
