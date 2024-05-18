import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { UseWeatherAppContext } from '../../context/Context';
// import 'dayjs/locale/fr'; // Importation du module français de dayjs
import "./meteo.scss";
dayjs.locale('fr'); // Définition de la langue française

const LeftComponents = () => {
  const WEEKDAYS = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const { state } = UseWeatherAppContext();

  if (!state || !state.current) return  <h1 style={{ fontFamily: 'Nunito, sans-serif', margin: 0, textAlign: 'center' }}>
  Prévisions de la semaine ...
</h1>;

  const weekdayIndex = dayjs.unix(state.current.dt).day();
  

  return (
    <>
      <div className='leftWrap' >
        <div className='dateWrap'>
          <h2>{WEEKDAYS[weekdayIndex]}</h2>
          <span className="dateDay">
            {dayjs.unix(state.current.dt).format("DD MMM YYYY")}
          </span>
          <span className="locationName">
            {state.city.city} - {state.city.admin_name} - {state.city.country}
          </span>
        </div><br />
        <div className="weatherContainer" >
          <img
            className="weatherIcon" alt="myit"
            src={`http://openweathermap.org/img/wn/${state.current.weather[0].icon}@2x.png`}
          />
          <h1 className="weatherTemp">{Math.round(state.current.temp.max)}°C</h1>
          <h3 className="weatherDesc">{state.current.weather[0].main}</h3>
        </div>
      </div>
    </>
  );
};

export default LeftComponents;
