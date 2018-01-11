import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            countriesToShow: [],
            searchField: '',
            oneCountry: null
        }
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            this.setState({countries: response.data})
            this.setState({countriesToShow: response.data})
        })
        this.setSearchCountry.bind(this)
    }

    handleSearchChange = (e) => {
        var textInput = document.getElementById('search');
        this.setState({searchField: textInput.value})
        this.updateSearchCriteria(textInput.value)
    }

    updateSearchCriteria = (criteria) => {
        const countriesLimited = this.state.countries.filter(function (country) {
            return country.name.includes(criteria)
        });
        this.setState({countriesToShow: countriesLimited})
        if (countriesLimited.length === 1) {
            this.setState({oneCountry: countriesLimited[0]})
        } else {
            this.setState({oneCountry: null})
        }
    }

    setSearchCountry = (arvo) => {
        return () => {
            this.setState({ searchField: arvo})
            this.updateSearchCriteria(arvo)
        }
    }

    dataOfCountries = () => {
        if (this.state.oneCountry == null) { //oneCountry is null if the search doesn't match exactly one country
            if (this.state.countriesToShow.length > 1 && this.state.countriesToShow.length < 10) {
                return (
                    <div>
                        {this.state.countriesToShow.map(country => <div key={country.alpha3Code}
                                                                        onClick={this.setSearchCountry(country.name)}>
                            {country.name}
                        </div>)}
                    </div>
                )}
            if (this.state.countriesToShow.length < 1) {
                return (
                    <div>
                        <p>No results</p>
                    </div>
                    )}
            return(
                <div>
                    <p>Too many results</p>
                </div>
            )
        }
        return(
            <div>
                <h2>{this.state.oneCountry.name}</h2>
                <p>Capital: {this.state.oneCountry.capital}</p>
                <p>Population: {this.state.oneCountry.population}</p>
                <img src={this.state.oneCountry.flag} alt={"Flag of the country"} width="200" />
            </div>        )
    }

    render() {
        return (
            <div>
                <h2>Maat</h2>
                <div>
                    rajaa näytettäviä: <input id={'search'} value={this.state.searchField} onChange={this.handleSearchChange}/>
                </div>
                {this.dataOfCountries()}
            </div>
        )
    }

}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
