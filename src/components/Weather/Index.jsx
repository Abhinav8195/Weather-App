import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';

const Index = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(false);

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${param}&appid=d76abbc8d87f259a795ba722dc401afe`);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setLoading(false);
                setWeather(data);
                setError(false);
            } else {
                setLoading(false);
                setError(true);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setError(true);
        }
    }
    

    async function handleSearch() {
        fetchWeatherData(search);
    }

    function kelvinToCelsius(kelvin) {
        return (kelvin - 273.15).toFixed(2);
    }
    function mpsToKmh(mps) {
        return (mps * 3.6).toFixed(2);
    }
    function mpsToMph(mps) {
        return (mps * 2.237).toFixed(2);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    useEffect(() => {
        fetchWeatherData("Ambala");
    }, []);

    return (
        <div className="App">
            <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
            {
                loading ? <div className='loading'>loading...</div> :
                    error ? <div className='no-location'>No location found. Please try again.</div> :
                        <div>
                            <div className='CityName'>
                                <h2>{weather?.city?.name}, <span>{weather?.city?.country}</span></h2>
                            </div>
                            <div className='date'>
                                <span>{getCurrentDate()}</span>
                            </div>
                            <div className='temperature'>
                                Temperature: {kelvinToCelsius(weather?.list[0]?.main?.temp)}°C
                            </div>
                            <div className='description'>
                                <p>{weather?.list[0]?.weather[0]?.description}</p>
                                <img
                                    src={`http://openweathermap.org/img/wn/${weather?.list[0]?.weather[0]?.icon}@2x.png`}
                                    alt={weather?.list[0]?.weather[0]?.description}
                                />
                            </div>
                            <div className='info'>
                                <div className='col'>
                                    <div>
                                        <p className='wind'>{mpsToKmh(weather?.list[0]?.wind?.speed)} km/h ({mpsToMph(weather?.list[0]?.wind?.speed)} mph)</p>
                                        <p>Wind Speed</p>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div>
                                        <p className='humidity'>{weather?.list[0]?.main?.humidity}%</p>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
}

export default Index;
