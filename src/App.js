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
        <Route exact path={RoutersLinks.Form_Odontologos} element={<Formulario tipo={'odontologos'} />} />
        <Route exact path={RoutersLinks.Form_Colaboradores} element={<Formulario tipo={'empleados'} />} />
        <Route exact path={RoutersLinks.View_Odontologos} element={<Insituciones tipo={'odontologos'} />} />
        {/* <Route exact path={RoutersLinks.View_Odontologos} element={<Odontologo tipo={'odontologos'} />} /> */}
        <Route exact path={RoutersLinks.View_Colaboradores} element={<Insituciones tipo={'empleados'} />} />
        {/* <Route exact path={RoutersLinks.View_Colaboradores} element={<Odontologo tipo={'empleados'} />} /> */}
        {/* <Route exact path={RoutersLinks.Insituciones} element={<Insituciones />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
