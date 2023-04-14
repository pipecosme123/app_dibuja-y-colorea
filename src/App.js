import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from './constantes/RoutersLinks';
import Formulario from './paginas/Formulario';
import Odontologo from './paginas/Odontologo';

import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutersLinks.Formulario} element={<Formulario />} />
        <Route exact path={RoutersLinks.Odontologos} element={<Odontologo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
