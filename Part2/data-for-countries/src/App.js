import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ExtendedCountry = (props) => {

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
    </>
  )

}


const CountryResult = (props) => {
  console.log(props.countries)
  if(props.countries.length === 1){
    return <ExtendedCountry country = {props.countries[0]}/>
  }
  else if(props.countries.length === 0){
    return <></>
  }
  else if(props.countries.length > 10){
    return <p>too many matches, specify filter more</p>
  }
  else{
    console.log("else case")
    return (
      <ul>
        {props.countries.map(country => <li key = {country.name}>{country.name}</li>)}
      </ul>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  const countriesToShow = filter===""
  ?[]
  :countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase())) 

  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then((reponse) => {
      setCountries(reponse.data)
    })
  },[])

  const handleFilterChange = (event) => setFilter(event.target.value)

  
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange}/>
      </div>
      <div>
        <CountryResult countries={countriesToShow}/>
      </div>
      
    </div>
  );
}

export default App;
