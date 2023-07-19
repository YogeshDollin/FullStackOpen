import Weather from "./Weather"

const Country = ({country}) => {
    if(country){
        return (
            <pre>
    
                <h1>{country.name.common}</h1>
    
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
    
                <h4>languages:</h4>
    
                <ul>
                    {Object.keys(country.languages).map((key) => <li key={key}>{country.languages[key]}</li>)}
                </ul>
    
                <img src={country.flags.png} alt={country.flags.alt}></img>

                <Weather country={country}/>
            </pre>
        )
    }
}
export default Country