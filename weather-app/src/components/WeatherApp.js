import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const WeatherApp = () => {
  const { register, handleSubmit } = useForm();
  const [weatherData, setWeatherData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.get('http://localhost:8000/api/weather', {
        params: {
          location: data.location
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('location')} placeholder="Enter location" />
        <button type="submit">Search</button>
      </form>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
