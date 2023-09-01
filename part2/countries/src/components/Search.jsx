import axios from 'axios'
import { useState, useEffect } from 'react'

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [result, setResult] = useState(null)

    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

    useEffect( () => {
        axios.get(`${baseUrl}/all`).then( res => {
            setCountries(res.data)
            
        })
    }, [])

    const handleSearchValueChange = (e) => {
        const immediateFiltered = countries.filter( r => r.name.common.toLowerCase().includes(e.target.value.toLowerCase()))

        setSearchValue(e.target.value)
        setFiltered(immediateFiltered)

        if (immediateFiltered.length === 1) 
            setResult(filtered.find( c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase())))
        else 
            setResult(null)
    }

    return (
        <>
            <div>
                Find countries 
                <input 
                    value={searchValue} 
                    onChange={handleSearchValueChange}
                    placeholder='Palestine'
                />
            </div>
            <div>
                <Results 
                    result={result} 
                    filtered={filtered} 
                    isEmpty={searchValue === ''}
                    handleSearchValueChange={handleSearchValueChange} />
            </div>
        </>
    )
}

const Results = ({ result, filtered, isEmpty, handleSearchValueChange }) => {
    const languages = []

    const handleView = (name) => handleSearchValueChange({target: {value: name}}) 

    if (result)
    {
        for (const language of Object.values(result.languages))
            languages.push(language)

        return (
            <div>
                <h1>{ result.name.official }</h1>
                <div>
                    capital {result.capital[0]}<br/>
                    area {result.area}
                </div>

                <h3>languages:</h3>
                <ul>
                    {
                        languages.map( language => <li key={language}>{ language }</li>)
                    }
                </ul>
                <img src={result.flags.svg} height={250}/>
                <Weather capital={result.capital[0]} />
            </div>
        )
    }
    else
    {
        if (!filtered || isEmpty) return null
        else if (filtered.length > 10) return <div>Too many matches. Specify another filter.</div>
        else if (filtered.length === 0) return <div>No results</div>
        else if (filtered.length > 1 && filtered.length < 10)
            return filtered.map( r =>   <div key={r.name.common}>
                                            { r.name.common }
                                            <button onClick={() => handleView(r.name.common)}> view </button>
                                        </div>)
    }
}

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState(null)
    const [iconUrl, setIconUrl] = useState('')
    const api_key = import.meta.env.VITE_OWM_KEY

    const getGeoEncoding = (city) => {
        return axios
            .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${api_key}`)
            .then( res => { return { lat: res.data[0].lat, lon: res.data[0].lon } } )
    }

    const getWeatherData = ({lat, lon}) => {
        return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
            .then( res => res.data )
    }

    const getWeatherIcon = (code) => {
        return `https://openweathermap.org/img/wn/${code}@2x.png`
    }

    useEffect( () => {
        getGeoEncoding(capital)
            .then( geoData => getWeatherData(geoData))
            .then( respData => {
                setWeather(respData) 
                setIconUrl(respData.weather[0].icon)
            })
    }, [])

    return (
        <div>
            <h3>Weather in {capital}</h3>
            {
                weather ? (
                <>
                    <div>temperature {weather.main.temp}</div>
                    <img src={getWeatherIcon(iconUrl)} />
                    <div>wind {weather.wind.speed}</div>
                </>
                )
                : null
            }
        </div>
    )
}

export default Search