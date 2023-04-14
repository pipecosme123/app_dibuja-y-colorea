import { ThemeProvider, createTheme } from '@mui/material';
import './css/App.css';
import Formulario from './paginas/Formulario';
import './css/fonts.css';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: ["Regular", "Light", "Bold"].join(',')
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Formulario />
    </ThemeProvider>
  );
}

export default App;
