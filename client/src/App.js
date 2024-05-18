import 'tailwindcss/tailwind.css';
import './index.css'

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewUser from "./pages/Signup/NewUser";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
// import WeatherForecast from "./pages/weather/WeatherForecast";
import HomeComponents from './components/Home';
import Recommandation from './components/Recommandation';
import DetectionDeMaladies from './components/DetectionDeMaladies';
import MainChat from './components/ChatAI/MainChat';
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Logout from "./pages/logout/Logout";

// const { spawn } = require('child_process');

// const cmdPath = 'C:\\Windows\\System32\\cmd.exe'; // Replace this with the actual path to cmd.exe
// const spawnArgs = ['/c', 'start', '""', '/b', 'http://localhost:3000/'];

// const child = spawn(cmdPath, spawnArgs);

// child.on('error', (err) => {
//   console.error('Error spawning cmd:', err);
// });

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            
            <Route index element={<Login />} />


          
            <Route path="dashboard" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="meteo" element={<HomeComponents />} />
            <Route path="recommandation" element={<Recommandation />} />
            <Route path="detection" element={<DetectionDeMaladies />} />
            <Route path="chat" element={<MainChat />} />
            <Route path="newuser" element={<NewUser />} />
            <Route path="logout" element={<Logout />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
