import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AssistantIcon from '@mui/icons-material/Assistant';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import logo2 from "../../images/logo2.png"
import LocalHospital from "@mui/icons-material/LocalHospital";
const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
      <img
              src={logo2} // Insère ici le chemin vers ton logo
              alt="Logo Agri-Ai Mali"
              className="logo-image"
              width="60px"
              height="60px"
            />
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Agri -Ai Mali</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPALE</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <p className="title">ANALYSE</p>
          <Link to="/meteo" style={{ textDecoration: "none" }}>
            <li>
              <ThunderstormIcon className="icon" />
              <span>Prévisions météorologiques</span>
            </li>
          </Link>
          <Link to="/recommandation" style={{ textDecoration: "none" }}>
          {/* <Link to="http://127.0.0.1:5000/" style={{ textDecoration: "none" }}> */}
        
          <li>
            <InsertChartIcon className="icon" />
            <span>Recommendations de culture</span>
          </li>
          </Link>
          <Link to="/detection" style={{ textDecoration: "none" }}>
          {/* <Link to="http://127.0.0.1:5000/" style={{ textDecoration: "none" }}> */}
        
          <li>
            <LocalHospital className="icon" />
            <span>Détection des maladies</span>
          </li>
          </Link>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <li>
              <AssistantIcon className="icon" />
              <span>IAChat</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Utilisateurs</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Produits</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Commandes</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Livraison</span>
          </li>
          <p className="title">UTILITAIRES</p>
          
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">PANNEAU ADMIN</p>
          
          <Link to="/newuser" style={{ textDecoration: "none" }}>
            <li>
            <ManageAccountsIcon className="icon" />
            <span>Créer un utilisateur</span>
            </li>
          </Link>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Santé du systeme</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Parametres</span>
          </li>
          <p className="title">Utilisateur</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <Link to="/logout" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Déconnexion</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
