import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { getEndpoint } from "../pages/const/const";
import Slide from '@mui/material/Slide';
import ViewFilms from "./viewVideoDialog"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VideoPop({
  user,
  perfil,
  open,
  video,
  handleClose,
  likeList,
  setLikeList,
  pendientesList,
  setPendientesList,
  vistoList,
  setVistoList,
}) {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDes, setVideoDes] = useState("");
  const [videoThum, setVideoThum] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCat, setVideoCat] = useState("");

  const [gusta, setGusta] = useState(false);
  const [pendiente, setPendiente] = useState(false);
  const [visto, setVisto] = useState(false);
  
  const [tiempo, setTiempo] = useState();
  const [minuto, setMinuto] = useState();

  const [openV, setOpenV] = React.useState(false);


  useEffect(() => {
    axios.get(getEndpoint(`/${video}`)).then((response) => {
      setVideoTitle(response.data.title);
      setVideoDes(response.data.description);
      setVideoThum(response.data.thumbnailUrl);
      setVideoUrl(response.data.videoUrl);
      setVideoCat(response.data.categorie);
    });

    if (likeList.some(item => item._id === video)) setGusta(true);
    else setGusta(false);

    if (pendientesList.some(item => item._id === video)) setPendiente(true);
    else setPendiente(false);

    if (vistoList.some(item => item._id === video)) {
      setVisto(true);
      //setTiempo(vistoList.find((item) => item.video === video).currentTime);
    }else{
        setVisto(false);
    }
  }, [video, likeList, pendientesList, vistoList]);


  //Control de botones
  ///LikeList
  const clickMegusta = () => {
  if (gusta) {
    // Already in the list, delete it
    axios
      .delete(getEndpoint(`/${user}/${perfil}/megusta_dlt`), {
        data: { videoId: video },
      })
      .then(() => {
        const updatedLikeList = likeList.filter((item) => item._id !== video);
        setLikeList(updatedLikeList);
        setGusta(false);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not in the list, add it
    axios
      .put(getEndpoint(`/${user}/${perfil}/megusta_add`), { videoId: video })
      .then(() => {
        const updatedLikeList = [
          { _id: video, videoUrl: videoUrl, thumbnailUrl: videoThum },
          ...likeList,
        ];
        setLikeList(updatedLikeList);
        setGusta(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

  ///lista pendientes
  const clickPendiente = () => {
    if (pendiente) {
      // Already in the list, delete it
    axios
    .delete(getEndpoint(`/${user}/${perfil}/pendientes_dlt`), {
      data: { videoId: video },
    })
    .then(() => {
      const updatedPendList = pendientesList.filter((item) => item._id !== video);
      setPendientesList(updatedPendList);
      setPendiente(false);
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  // Not in the list, add it
  axios
    .put(getEndpoint(`/${user}/${perfil}/pendientes_add`), { videoId: video })
    .then(() => {
      const updatedPendList = [
        { _id: video, videoUrl: videoUrl, thumbnailUrl: videoThum },
        ...pendientesList,
      ];
      setPendientesList(updatedPendList);
      setPendiente(true);
    })
    .catch((error) => {
      console.log(error);
    });
}
};

  const clickReproducir = () => {
    if (visto) {
      setOpenV(true);
    }else{
      axios.put(getEndpoint(`/${user}/${perfil}/visto`), {videoId: video, tiempo: 0})
      .then(()=>{
        const updatedVistoList = [
          { _id: video, videoUrl: videoUrl, thumbnailUrl: videoThum},
          ...vistoList,
        ];
        setVistoList(updatedVistoList);
        setVisto(true);
        setOpenV(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleCloseV = () => {
    setOpenV(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)" }}
    >
      <Card
        style={{ maxHeight: 800, overflow: "auto", backgroundColor: "rgb(24, 24, 24)" }}
      >
        <CardHeader
          style={{ color: "white" }}
          title={videoTitle}
          action={
            <IconButton aria-label="settings" style={{ color: "white" }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardMedia component="img" height="500" image={videoThum} />
        <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            style={{ color: "black", backgroundColor: "white" }}
            onClick={clickReproducir}
          >
            {visto?"Seguir viendo":"Reproducir"}
        </Button>
        <IconButton
            aria-label="add to favorites"
            style={gusta ? { color: "red" } : { color: "white" }}
            onClick={clickMegusta}
          >
            <FavoriteIcon />
        </IconButton>
        <IconButton
            aria-label="add to pendientes"
            style={pendiente ? { color: "green" } : { color: "white" }}
            onClick={clickPendiente}
          >
            <AddIcon />
        </IconButton>
        <CardContent style={{ color: "white" }}>
          <Typography variant="h5">{videoCat}</Typography>
          <br />
          <Typography variant="body1">{videoDes}</Typography>
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={openV}
        onClose={handleCloseV}
        TransitionComponent={Transition}
      >
        {/* comp Edu */}
        <ViewFilms user= {user} profiles={perfil} videoURL={videoUrl} videoID={video} handleCloseV={handleCloseV}></ViewFilms>
      </Dialog>
    </Dialog>
  );
}
