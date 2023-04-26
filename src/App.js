import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from './constantes/RoutersLinks';
import Formulario from './paginas/Formulario';
import Odontologo from './paginas/Odontologo';

import './css/App.css';
// import Insituciones from './paginas/Insituciones';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutersLinks.Formulario} element={<Formulario />} />
        <Route exact path={RoutersLinks.Form_Colaboradores} element={<Formulario colaborador={true} />} />
        <Route exact path={RoutersLinks.Odontologos} element={<Odontologo />} />
        {/* <Route exact path={RoutersLinks.Insituciones} element={<Insituciones />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
