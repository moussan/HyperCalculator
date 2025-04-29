import React from 'react';
import { AppBar, Toolbar, Typography, Select, MenuItem } from '@mui/material';

interface HeaderProps {
  themeName: string;
  onThemeChange: (theme: string) => void;
}

const Header: React.FC<HeaderProps> = ({ themeName, onThemeChange }) => {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Advanced Scientific Calculator
        </Typography>
        <Select
          value={themeName}
          onChange={(e) => onThemeChange(e.target.value as string)}
          variant="outlined"
          size="small"
          sx={{
            color: 'inherit',
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'inherit' },
            '.MuiSvgIcon-root': { color: 'inherit' },
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        >
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="neon">Neon Dark</MenuItem>
          <MenuItem value="pastel">Pastels</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
