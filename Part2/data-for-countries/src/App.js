import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'




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

  const handleShowClick = (country) => setFilter(country.name)
  

  
  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilterChange}/>
      </div>
      <div>
        <Filter countries={countriesToShow} handleClick={handleShowClick}/>
      </div>
      
    </div>
  );
}

export default App;
