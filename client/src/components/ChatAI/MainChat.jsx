// import React from "react";
// import ReactDOM from "react-dom/client";


// const queryClient = new QueryClient()

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <Chat />
//     </QueryClientProvider>
//   </React.StrictMode>
// )




// 
// 34480b98aa332da53123a0ac63a4ea9d weather api key
// 34480b98aa332da53123a0ac63a4ea9d
// https://home.openweathermap.org/api_keys



// https://simplemaps.com/data/in-cities
// https://openweathermap.org/
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat=20&lon=85&appid=34480b98aa332da53123a0ac63a4ea9d




import React from 'react'
import Chat from "./Chat";
import { QueryClientProvider, QueryClient } from "react-query";
// import "./index.css";

import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const MainChat = () => {
  const queryClient = new QueryClient()
  return (
    <div><React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
            <div className='homeWra'>
                
                    <div className='rightSide'>
                            <Chat />
                    </div>
                </div>
            </div>
            </div>
    </QueryClientProvider>
  </React.StrictMode></div>
  )
}

export default MainChat