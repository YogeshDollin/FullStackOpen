const Countries = ({countries, setCountry}) => {
    let result;
    if(countries.length <= 10 && countries.length > 1){
        result = (
            countries.map((country) => <p key={country.name.common}>{country.name.common} <button onClick={()=> setCountry(country)}>show</button></p>)
        )
    }
    else {
        result = (
            <div>
              Too many matches, specify another filter
            </div>
        )
    }
    return result
}

export default Countries