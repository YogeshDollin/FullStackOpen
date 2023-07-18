import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState(null);

  useEffect(() =>{
    if(currency){
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value);
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange}/>
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App;
