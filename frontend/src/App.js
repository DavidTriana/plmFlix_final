import './App.css';
import { styled } from '@mui/material/styles';
import Login from "./pages/login.js";
import Profiles from "./pages/profiles.js";
import Home from "./pages/home";
import ViewFilms from "./pages/viewFilms";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Configuration from './pages/configuration';
import Administrador from './pages/administrador';
import Register from './pages/register';
import UserContact from './pages/userContact';
import Forms from './pages/forms';

const PREFIX = 'App';

const classes = {
  root: `${PREFIX}-root`
};

const StyledLocalizationProvider = styled(LocalizationProvider)({
  [`& .${classes.root}`]: {
    minHeight: '100vh',
    backgroundColor: '#111',
  },
});

function App() {

  return (
    <StyledLocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:user/profiles" element={<Profiles />} />
          <Route path="/:user/:profile/home" element={<Home />} />
          <Route path="/:user/:profile/:film/viewFilms" element={<ViewFilms />} />
          <Route path="/:user/:profile/configuration" element={<Configuration />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/:administrador/forms" element={<Forms/>}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/:user/:profile/contact" element={<UserContact />} />    
        </Routes>
      </Router>
    </StyledLocalizationProvider>
  );
}

export default App;
