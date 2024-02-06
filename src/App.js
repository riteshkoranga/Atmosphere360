
import './App.css';
import Search from './components/search/search';
import Currentweather from './components/current-weather/current-weather';
import { wetherapiurl, wapikey } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';

function App() {

  const [currentweather, setWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentweatherfetch = fetch(`${wetherapiurl}/weather?lat=${latitude}&lon=${longitude}&appid=${wapikey}&units=metric`);
    const currentforcastfetch = fetch(`${wetherapiurl}/forecast?lat=${latitude}&lon=${longitude}&appid=${wapikey}&units=metric`);

    Promise.all([currentweatherfetch, currentforcastfetch])
      .then(async (response) => {
        const weatherresponse = await response[0].json();
        const forecastresponse = await response[1].json();
        setWeather({ city: searchData.label, ...weatherresponse });
        setforecast({ city: searchData.label, ...forecastresponse });
      })
      .catch((err) => console.log());
  }

  console.log(currentweather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentweather && <Currentweather data={currentweather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
