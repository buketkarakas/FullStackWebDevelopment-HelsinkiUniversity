import React from 'react'


const CountryDetail = (props) => {

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

  export default CountryDetail;
  