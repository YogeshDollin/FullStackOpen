import axios from "axios";
import { useEffect, useState } from "react";
const Weather = ({country}) => {
    const [weatherData, setWeatherData] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY
    const coordinates = {latitude: country.capitalInfo.latlng[0], longitude: country.capitalInfo.latlng[1]}
    const weatherDataUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${apiKey}`
    useEffect(() => {
        axios
        .get(weatherDataUrl)
        .then(response => {
            setWeatherData(response.data)
        })
    }, [])

    if(Object.keys(weatherData).length > 0){
        const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        return (
            <div>
                <h2>Weather in  {country.capital[0]}</h2>
                <p>temperature {weatherData.main.temp} Celsius</p>
                <img src={weatherIcon} alt="weather icon"/>
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        )
    }
}

export default Weather