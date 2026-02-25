import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E88C8',
      light: '#42A5F5',
      dark: '#0D47A1',
    },
    secondary: {
      main: '#0B3D91',
    },
    background: {
      default: '#ffffff',
    },
  },

  typography: {
    fontFamily: 'Poppins, Roboto, sans-serif',
    fontWeightBold: 700,
  },
});

export default theme;
