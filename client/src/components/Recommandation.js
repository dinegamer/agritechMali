import React from 'react';
import CropRecommendation from './ChooseState/Recommandation.jsx';
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";


const Recommandation = ()=>{   
    return (
        <>
         <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
            <div className='homeWra'>
                
                    <div className='rightSide'>
                            <CropRecommendation />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Recommandation;


// 
// 34480b98aa332da53123a0ac63a4ea9d weather api key
// 34480b98aa332da53123a0ac63a4ea9d
// https://home.openweathermap.org/api_keys



// https://simplemaps.com/data/in-cities
// https://openweathermap.org/
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/3.0/onecall?lat=20&lon=85&appid=34480b98aa332da53123a0ac63a4ea9d


