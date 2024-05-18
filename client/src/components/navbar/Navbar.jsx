import "./navbar.scss";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import AgricultureIcon from '@mui/icons-material/Agriculture';
// import { LuLeaf } from "react-icons/lu";
// import { GiLeafSwirl } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";
// import { PiPottedPlantBold } from "react-icons/pi";
import { GiCow } from "react-icons/gi";
import {  Typography } from '@mui/material';



const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="item">
          <AgricultureIcon />
        </div>
        {/* <div className="item">
          <LuLeaf />
        </div>
        <div className="item">
        <GiLeafSwirl />
        </div> */}
        <div className="item">
        <GiFarmer />
        </div>
        {/* <div className="item">
        <PiPottedPlantBold />
        </div> */}
        <div className="item">
        <GiCow />
        </div>
        <Typography variant="h4" align="center" sx={{ color: 'gray', fontFamily: 'Nunito, sans-serif', margin: 0 }}>Bienvenue sur Agri-Ai Mali<span role="img" aria-label="plant">🌱</span></Typography>
        
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Francais
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://media.istockphoto.com/id/1305447687/photo/taking-care-of-my-plants.jpg?s=1024x1024&w=is&k=20&c=JrI2dWb9DnjSoFzDv9dNTEt421UPxSuRhQK2Z6nR3jU="
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
