import React from 'react';
import  {UseWeatherAppContext} from '../../context/Context';

const HumidityComponents = ()=>{
    
    let {state:{current, city}} = UseWeatherAppContext();
    console.log('myData', current, city);

    const uvLevel = (uvIndex) => {
        if (uvIndex <= 2) return "Low";
        if (uvIndex <= 5) return "Medium";
        if (uvIndex <= 7) return "High";
        if (uvIndex > 7) return "Very High";
    };

    return (
        <>
        {
            current ? <div className='humidityWrap'>
            <div className='humidityData'>
                <div className='title'>Indices UV </div>
                <div className='value'>{Math.round(current.uvi)} ({uvLevel(Math.round(current.uvi))})</div>
            </div>
            <div className='humidityData'>
                <div className='title'>HUMIDITE </div>
                <div className='value'>{current.humidity} %</div>
            </div>
            <div className='humidityData'>
                <div className='title'>VENT </div>
                <div className='value'>{Math.round(current.wind_speed)} km/h</div>
            </div>
            <div className='humidityData'>
                <div className='title'>{city.city} - {city.admin_name} - Population</div>
                <div className='value'>{parseFloat(city.population).toLocaleString('en')}</div>
            </div>
        </div>: ''
        }
            
        </>
    )
}

export default HumidityComponents;