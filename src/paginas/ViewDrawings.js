import { Container, ImageList, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import Toast from "../componentes/Toast";
import Loading from "../componentes/Loading";
import ImageItem from "../componentes/ImageItem";
import WindowModal from "../componentes/WindowModal";
import { urlApi } from "../constantes/RoutersLinks";
import TextField from "../componentes/TextField";
import logo from "../css/img/Logo.svg";

import "../css/ViewDrawings.css";
import InfiniteScroll from "react-infinite-scroll-component";

const ViewDrawings = ({ tipo, url_data }) => {
  window.document.title = "Incripciones - Dibuja y Colorea";

  const [show, setShow] = useState(false);
  const [imageModal, setImageModal] = useState("");

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const { loading, api_handleSubmit } = useApi();

  const handleShow = (data) => {
    setImageModal(data);
    setShow(true);
  };

  const handleClose = () => {
    setImageModal("");
    setShow(false);
  };

  const get_data = (page) => {
    let newPage = page + 1;
    api_handleSubmit({
      method: "get",
      url: `/${url_data}/${tipo}/${newPage}`,
    })
      .then((res) => {
        console.log(res.data);
        setPage(newPage);
        setData(data.concat(res.data));
      })
      .catch((err) => {
        <Toast title="¡Error!" message={err.data} />;
      });
  };

  useEffect(() => {
    get_data(page);
  }, []);

  return (
    <Container fixed className="ViewDrawings">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <TextField type={"h4"} align={"center"}>
        PINTA UN MURAL
      </TextField>
      <TextField type={"h5"} align={"center"}>
        CON EL Dr. MUELITAS
      </TextField>
      <Paper className="paper-ViewDrawings" elevation={2}>
        <TextField type={"body1"} align={"center"}>
          Edición:
        </TextField>
        <TextField type={"h6"} align={"center"}>
          {"Instituciones"}
        </TextField>

        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          next={() => get_data(page)}
          hasMore={true}
          loader={<Loading open={loading} />}
          scrollableTarget="InfiniteScroll"
        >
          <ImageList className="ImageList-dibujos">
            {data.map((item, index) => (
              <div key={index}>
                <ImageItem item={item} handleShow={handleShow} />
              </div>
            ))}
          </ImageList>
        </InfiniteScroll>

        <Loading open={loading} />

        {show && (
          <WindowModal show={show} handleClose={handleClose}>
            <div className="content-img-modal">
              <img
                className="img-modal"
                src={`${urlApi}/images?key=${imageModal.url}`}
                alt=""
              />
            </div>
            <div className="content-information">
              <TextField type={"subtitle1"}>
                {/* <b>Institución:</b> {imageModal.id_instituciones} <br/> */}
                <b>Institución:</b> {imageModal.nombre}
                <br />
                <b>Sede:</b> {imageModal.sede}
              </TextField>
              <hr />
              <TextField type={"caption"}>
                <b>Docente:</b> {imageModal.nombresD} {imageModal.apellidosD}
                <br />
                <b>Rector:</b> {imageModal.nombresR} {imageModal.apellidosR}
              </TextField>
              <hr />
              <TextField type={"caption"}>
                <b>Clave:</b> {imageModal.url}
              </TextField>
            </div>
          </WindowModal>
        )}
      </Paper>
    </Container>
  );
};

export default ViewDrawings;
