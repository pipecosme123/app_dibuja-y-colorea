import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from './constantes/RoutersLinks';
import Formulario from './paginas/Formulario';
// import Odontologo from './paginas/Odontologo';

import './css/App.css';
import Insituciones from './paginas/Insituciones';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutersLinks.Page_instituciones} element={<Formulario tipo={'odontologos'} />} />
        <Route exact path={RoutersLinks.Form_insituciones} element={<Insituciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
