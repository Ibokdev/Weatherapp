import React, { useState, useEffect } from "react";
import "./App.css";
import Background from "./components/background";
import sunrain from "./assets/Suncloudrain.svg";
import vec from "./assets/vector.svg";
import temp from "./assets/temp.svg";
import distant from "./assets/distant.svg";
import cloud9 from "./assets/cloud9.svg";
import calendar from "./assets/calendar.svg";
import axios from "axios";

function App() {
  // const [weatherData, setWeatherData] = useState("")
  const [ForecastData, setForecastData] = useState("");

  // const getWeather = () => {
  //   axios.get(`http://api.weatherapi.com/v1/current.json?key=434302e15ad1472c9e8120424230104&q=lagos&aqi=no`)
  //   .then ((response) => {
  //     console.log(response.data)
  //     setWeatherData(response?.data)
  //   })
  //   .catch((error) => {
  //     console.log(error.response)
  //   })
  // }

  const getForecast = () => {
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=434302e15ad1472c9e8120424230104&q=lagos&days=7`
      )
      .then((response) => {
        console.log(response.data);
        setForecastData(response?.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    // getWeather()
    getForecast();
  }, []);

  return (
    <Background>
      <div className="mobile">
        <img src={`https:${ForecastData?.current?.condition?.icon}`} alt="" />
        <h1 id="degree">{`${ForecastData?.current?.temp_c}`}º</h1>
        <div id="prep">
          <h6>Precipitations</h6>
          <h6>
            Max.: {`${ForecastData?.current?.precip_mm}`} Min.:{" "}
            {`${ForecastData?.current?.precip_in}`}
          </h6>
        </div>
        <div className="reading">
          <div className="read">
            <img src={vec} alt="" />
            <h6>{`${ForecastData?.current?.humidity}`}%</h6>
          </div>
          <div className="read">
            <img src={temp} alt="" />
            <h6>{ForecastData?.current?.humidity}</h6>
          </div>
          <div className="read">
            <img src={distant} alt="" />
            <h6>{ForecastData?.current?.wind_kph}%</h6>
          </div>
        </div>
        {/* <div className="forecast">
          <div className="Tforecast">
            <h5 id="fores">Today</h5>
            <h6 id="fores">{ForecastData?.location?.localtime}</h6>
          </div>
          <div className="wOne">
            <div id="details">
              <h6>29°C</h6>
              <img src={cloud9} alt="" />
              <h6>15.00</h6>
            </div>
            <div id="details">
              <h6>29°C</h6>
              <img src={cloud9} alt="" />
              <h6>15.00</h6>
            </div>
            <div id="details">
              <h6>29°C</h6>
              <img src={cloud9} alt="" />
              <h6>15.00</h6>
            </div>
            <div id="details">
              <h6>29°C</h6>
              <img src={cloud9} alt="" />
              <h6>15.00</h6>
            </div>
          </div>
        </div> */}
        <div className="forecast">
          <div className="Tforecast">
            <h5 id="fores">Next Forecast</h5>
            <img src={calendar} alt="" />
          </div>
          <div className="Trmw">
            {ForecastData?.forecast?.forecastday?.map((item) => (
              <div className="Tfore">
                <div id="Tdays">
                  <h3>{item?.date}</h3>
                  <img src={`https:${item?.day?.condition?.icon}`} alt="" />
                </div>
                <div id="Tweather">
                  <h4>Min:{item?.day?.mintemp_c}°C</h4>
                  <h4>Max:{item?.day?.maxtemp_c}°C</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Background>
  );
}

export default App;
