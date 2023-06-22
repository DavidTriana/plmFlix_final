import * as React from "react";
import { styled } from "@mui/material/styles";
import Header from "../components/header";
import Banner from "../components/banner";
import Footer from "../components/footer";
import Categoria from "../components/category";
import VideoPop from "../components/videoPop";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getEndpoint } from "./const/const";
import { Button } from "@mui/material";
import axios from "axios";
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const PREFIX = "home";

const classes = {
  root: `${PREFIX}-root`,
  categorias: `${PREFIX}-categorias`,
};

const Root = styled("div")({
  [`&.${classes.root}`]: {
    backgroundColor: "#111",
    width: "100%",
    height: "100%",
  },

  [`& .${classes.categorias}`]: {
    display: "grid",
    gridAutoRows: "repeat(2, auto)",
    gridGap: "30px",
    margin: "30px 0 30px 0",
  },
});



export default function Home() {
  const { user, profile } = useParams();
  const [open, setOpen] = useState(false);

  const [categoriesList, setCategoriesList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [pendientesList, setPendientesList] = useState([]);
  const [vistoList, setVistoList] = useState([]);
  const [video, setVideo] = useState("");
  const [currentCategory, setCurrentCategory] = useState(null);

  function click(id) {
    setVideo(id);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(getEndpoint(`/${user}/${profile}/home`))
      .then((response) => {
        setCategoriesList(response.data.categories);
        setLikeList(response.data.likeList);
        setPendientesList(response.data.pendienteList);
        setVistoList(response.data.vistoList);
      });

      console.log("problemas");
  }, [profile]);

  return (
    <Root className={classes.root}>
      <Header />
      <div className={classes.body}>
        <Banner categoriesList={categoriesList}  video={video} reproducir={click}/>
        <VideoPop
          user={user}
          perfil={profile}
          open={open}
          video={video}
          handleClose={handleClose}
          likeList={likeList}
          setLikeList={setLikeList}
          pendientesList={pendientesList}
          setPendientesList={setPendientesList}
          vistoList={vistoList}
          setVistoList={setVistoList}
        />

        <div className={classes.categorias}>
          {vistoList.length > 0 && (
            <div className="container">
              <Categoria
                click={click}
                nombrecategoria={"Seguir viendo"}
                listaPelis={vistoList}
              />
            </div>
          )}

          {likeList.length > 0 && (
            <div className="container">
              <Categoria
                click={click}
                nombrecategoria={"Favoritos"}
                listaPelis={likeList}
              />
            </div>
          )}

          {pendientesList.length > 0 && (
            <div className="container">
              <Categoria
                click={click}
                nombrecategoria={"Pendiente de ver"}
                listaPelis={pendientesList}
              />
            </div>
          )}

          {categoriesList.map((categoria, index) => {
            if (categoria.videos.length > 0) {
              return (
                <div className="container">
                  <Categoria
                    click={click}
                    nombrecategoria={categoria.title}
                    listaPelis={categoria.videos}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <Footer />
    </Root>
  );
}
