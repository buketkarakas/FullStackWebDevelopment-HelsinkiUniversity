import React from 'react'
import CountryDetail from './CountryDetail'
import Button from './Button'


const Filter = (props) => {
    if(props.countries.length === 1){
      return <CountryDetail country = {props.countries[0]}/>
    }
    else if(props.countries.length === 0){
      return <></>
    }
    else if(props.countries.length > 10){
      return <p>too many matches, specify filter more</p>
    }
    else{
      return (
        <ul>
          {props.countries.map(country => <li key = {country.name}>{country.name} <Button name="show" handleClick={()=>props.handleClick(country)}/></li>)}
        </ul>
      )
    }
  }

  export default Filter;