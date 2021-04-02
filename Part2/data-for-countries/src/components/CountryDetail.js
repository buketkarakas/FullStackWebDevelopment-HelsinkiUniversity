import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = (props) => {
    if(props.weather.current === undefined)
        return <></>
    return(
        <> 
            <h2>Weather in {props.capital}</h2>
            <div><b>temperature:</b> {props.weather.current.temperature} Celcius</div>
            <img src={props.weather.current.weather_icons[0]} alt="weather_icon" width="150" height="150"/>
            <div><b>wind:</b> {props.weather.current.wind_speed} mph direction {props.weather.current.wind_dir}</div>
        </>
    )

}

const CountryDetail = (props) => {
    const [weather,setWeather] = useState({})
    const access_key = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        const url =`http://api.weatherstack.com/current?access_key=${access_key}&query=${props.country.capital}`
        axios
        .get(url)
        .then((response)=>{
            console.log(response.data)
            setWeather(response.data)
        })
    },[])

    return (
      <>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map((language)=><li key = {language.name}>{language.name}</li>)}
      </ul>
      <img src={props.country.flag} alt="Flag" width="200" height="200"/>
      <Weather capital={props.country.capital} weather = {weather}/>
      </>
    )
  
  }

  export default CountryDetail;
  