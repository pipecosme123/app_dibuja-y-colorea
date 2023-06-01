import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoutersLinks } from "./constantes/RoutersLinks";
import Insituciones from "./paginas/Insituciones";
import PublicInstituciones from "./paginas/PublicInstituciones";

import { ThemeProvider, createTheme } from "@mui/material";

import "./css/App.css";
import Login from "./paginas/Login";
import AuthContextProvider from "./context/authContext";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ViewDrawings from "./paginas/ViewDrawings";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#27d2f0",
      },
      secondary: {
        main: "#82bb00",
      },
      third: {
        main: "#d2010d",
      },
      fourth: {
        main: "#5F8700",
      },
    },
    overrides: {
      MuiInput: {
        underline: {
          "&:before": {
            borderBottom: "2px solid rgba(0, 0, 0, 0.42)",
          },
          "&:hover:not($disabled):before": {
            borderBottom: `2px solid #27d2f0`,
          },
          "&:after": {
            borderBottom: `2px solid #27d2f0`,
          },
        },
      },
    },
    typography: {
      fontFamily: ["Light", "Regular", "Bold"].join(","),
    },
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Insituciones />} />
            <Route path={RoutersLinks.Seleccion} element={<ViewDrawings />} />

            <Route
              path={RoutersLinks.Page_instituciones}
              element={<PublicRoute />}
            >
              <Route exact path={RoutersLinks.Login} element={<Login />} />
            </Route>

            <Route
              path={RoutersLinks.Form_insituciones}
              element={<PrivateRoute />}
            >
              <Route index element={<PublicInstituciones />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
