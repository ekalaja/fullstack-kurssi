import React from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            searchField: '',
            notification: null


        }
        this.componentWillMount()
        this.showPersons = this.showPersons.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)


    }
    createPerson= (e) => {
        e.preventDefault()
        const personObject = {
            name: this.state.newName,
            id: this.state.persons.length + 1,
            number: this.state.newNumber
        }
        const uniqueNames = new Set(this.state.persons.map(person => person.name));
        uniqueNames.add(personObject.name)
        if (uniqueNames.size === this.state.persons.length + 1) {
            this.addPerson(personObject)
        } else {
            const original = this.state.persons.find(p => p.name === this.state.newName)
            this.updatePerson(original.id, this.state.newNumber)
        }

    }

    addPerson = (personObject) => {
        personService
            .create(personObject)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response),
                    newName: '',
                    newNumber: '',
                    notification: `lisättiin ${response.name}`
                })
                setTimeout(() => {
                    this.setState({notification: null})
                }, 3000)
            })
    }

    updatePerson = (id, number) => {
            const person = this.state.persons.find(n => n.id === id)
            const changedPerson = { ...person, number: number }
            personService
                .update(id, changedPerson)
                .then(changedPerson => {
                    const persons = this.state.persons.filter(n => n.id !== id)
                    this.setState({
                        persons: persons.concat(changedPerson),
                        notification: `muutettiin henkilön ${changedPerson.name} numeroa`
                    })
                    setTimeout(() => {
                        this.setState({notification: null})
                    }, 3000)
                })
                .catch(error => {
                    this.addPerson(changedPerson)
                })
    }

    deletePerson = (e) => {
        return () => {(
            personService
                .deleteOne(e)
                .then(changedPerson => {
                    const persons = this.state.persons.filter(n => n.id !== e)
                    const removed = this.state.persons.find(n => n.id === e)
                    this.setState({persons})
                    this.setState({
                        notification: `poistettiin henkilö ${removed.name}`
                    })
                    setTimeout(() => {
                        this.setState({notification: null})
                    }, 3000)
                })

        )}

    }

    deleteTest = (e) => {
        window.confirm("juhuu")
    }


    componentWillMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({persons})
            })
    }

    handleNameChange = (e) => {
        this.setState({ newName: e.target.value })

    }

    handleNumberChange = (e) => {
        this.setState({ newNumber: e.target.value })
    }

    handleSearchChange = (e) => {
        this.setState({searchField: e.target.value})
    }


    showPersons = (e) => {
        const nameSearch = this.state.searchField
        const personsLimited = this.state.persons.filter(function (person) {
            return person.name.includes(nameSearch)
        });
        return(
            <div>
                {personsLimited.sort(byId).map(person => <div key={person.id} >
                    <li>{person.name}: {person.number} <button onClick={this.deletePerson(person.id)}>jep</button></li>
                </div>)}

            </div>
        )
    }



    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.notification}/>

                <div>
                    rajaa näytettäviä: <input value={this.state.searchField} onChange={this.handleSearchChange}/>
                </div>
                <form onSubmit={this.createPerson}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <div>
                    <h2>Numerot</h2>
                    {this.showPersons()}
                </div>
            </div>
        )
    }
}

const byId = (note1, note2) => note1.id - note2.id

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="notification">
            {message}
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
