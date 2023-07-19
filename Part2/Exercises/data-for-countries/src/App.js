import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './Component/Country';
import Countries from './Component/Countries';

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const loadCountries = () => {
    const countriesMatched = countries.filter( country => country.name.common.toLowerCase().includes(value))
    if(countriesMatched.length === 1){
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countriesMatched[0].name.common}`)
        .then(response => {
          setCountry(response.data)
        })
    }
    else {
      return <Countries countries={countriesMatched} setCountry={setCountry}/>
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountry(null)
  }
  return (
    <div>
      find countries <input value={value} onChange={handleChange}/>
      {
        country ? <Country country={country}/> : loadCountries()
      }
    </div>
  )
}

export default App;
