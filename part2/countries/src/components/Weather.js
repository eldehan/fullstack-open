import { useEffect, useState } from "react";
import axios from "axios";
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ city }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature {weather.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </>
  );
};

export default Weather;
