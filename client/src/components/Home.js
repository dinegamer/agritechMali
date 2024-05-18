import React from 'react';
import WeekInfoCardComponents from './WeekInfoCard';
import ChooseStateComponents from './ChooseState';
import HumidityComponents from './HUMIDITY';
import LeftComponents from './Left';
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import './meteo.css';
import WeatherAPPProvider from '../context/Context'; // Assurez-vous d'importer le WeatherAPPProvider

const HomeComponents = ()=>{   
    return (
        <>
            <div className="new">
                <Sidebar /> 
                <div className="newContainer">
                    <Navbar />
                    <div className='homeWrap' > 
                        <div className='weatherSection'>
                            <WeatherAPPProvider>
                                <LeftComponents />
                            </WeatherAPPProvider>
                            <div className='rightSide'>
                                <WeatherAPPProvider>
                                    <ChooseStateComponents />
                                    <WeekInfoCardComponents />
                                    <HumidityComponents />
                                </WeatherAPPProvider>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeComponents;
