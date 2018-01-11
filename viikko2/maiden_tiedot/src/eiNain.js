import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            countriesToShow: [],
            oneCountry: null
        }
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            this.setState({ countries: response.data })
            this.setState({ countriesToShow: response.data })
        })
    }

    handleSearchChange = (e) => {
        console.log("handleSearch this.state: ", this.state)
        var textInput = document.getElementById('search');
        const countriesLimited = this.state.countries.filter(function (country) {
            return country.name.includes(textInput.value)
        });
        this.setState({ countriesToShow: countriesLimited })
        if (countriesLimited.length === 1) {
            this.setState({ oneCountry: countriesLimited[0]})
        } else {
            this.setState({ oneCountry: null})
        }
    }




    render() {
        return (
            <div>
                <h2>Maat</h2>
                <div>
                    rajaa näytettäviä: <input id={'search'} onChange={this.handleSearchChange}/>
                </div>
                <Countries this={this}/>
            </div>
        )
    }

    static setStateVariablesForOneCountry(props, name) {
        console.log("static props: ",props)

        const countriesLimited = props.state.countries.filter((country) => {
            return country.name.includes(name)
        });
        props.setState({ countriesToShow: countriesLimited })
        console.log("SET THAT ONE!")
        if (countriesLimited.length === 1) {
            props.setState({ oneCountry: countriesLimited[0]})
        }

    }
}



const Country = (props)  => {
    console.log("Country props: ", props)

    return(
        <div onClick={App.setStateVariablesForOneCountry(props.state, props.country.name)}>
            <li>
                {props.country.name}
            </li>
        </div>
    )}


const Countries = (props) => {
    console.log("Countries this: ", props.this)
    console.log("coutnries to SHOW: ",props.this.state.countriesToShow)

    console.log("coutnries to SHOW: ",props.this.state.oneCountry)

    if (props.this.state.countriesToShow.length === 0) {
        return(
            <div>
                <p>No matches</p>
            </div>   )}
    else if (props.this.state.countriesToShow.length > 1 && props.this.state.countriesToShow.length < 10) {
        return (
            <div>
                {props.this.state.countriesToShow.map(country => <Country key={country.alpha3Code} country={country} state={props.this}/>)}
            </div>
        )}
    else if (props.this.state.oneCountry != null){
        return(
            <div>
                <h2>{props.this.state.oneCountry.name}</h2>
                <p>Capital: {props.this.state.oneCountry.capital}</p>
                <p>Population: {props.this.state.oneCountry.population}</p>
                <img src={props.this.state.oneCountry.flag} alt={"Flag of the country"} width="200" />
            </div>
        )
    }
    return (
        <div>
            <p>Too many matches</p>
        </div>
    )}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
