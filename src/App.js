import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RoutersLinks } from './constantes/RoutersLinks';
import Insituciones from './paginas/Insituciones';
import PublicInstituciones from './paginas/Public_Instituciones';

import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutersLinks.Page_instituciones} element={<PublicInstituciones />} />
        <Route exact path={RoutersLinks.Form_insituciones} element={<Insituciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
