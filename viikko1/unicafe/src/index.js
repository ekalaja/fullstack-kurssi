import React from 'react'
import ReactDOM from 'react-dom'




const Button = (props) => {
    return (
        <button onClick={props.click_method}>
            {props.name}
        </button>
    )
}

const Statistics = (props) => {
    const average_clicks = () => (props.state.good_counter - props.state.bad_counter)/props.state.sum_of_all
    const positive_clicks = () => Math.floor((props.state.good_counter / props.state.sum_of_all)*100)
    if (props.state.sum_of_all === 0) {
        return (
            <div>
                <h2>statistiikka</h2>
                <p>yhtään palautetta ei ole annettu</p>
            </div>
        )
    }
    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <Statistic name='hyvä' value={props.state.good_counter}/>
                    <Statistic name='neutraali' value={props.state.neutral_counter}/>
                    <Statistic name='huono' value={props.state.bad_counter}/>
                    <Statistic name='keskiarvo' value={average_clicks()}/>
                    <Statistic name='positiivisia' value={positive_clicks()} symbol='%'/>
                </tbody>
            </table>


        </div>
    )
}


const Statistic = (props) => {
    return (
        <tr>
            <td>{props.name}: {props.value} {props.symbol}</td>
        </tr>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.addOneClick = this.addOneClick.bind(this)

        this.state = {
            good_counter: 0,
            neutral_counter: 0,
            bad_counter: 0,
            sum_of_all: 0
        }
    }

    addOneClick(counterName) {
        return () => {
            const chosenCounter = this.state[counterName]
            this.setState({
                [counterName]: chosenCounter + 1,
                sum_of_all: this.state.sum_of_all + 1})
        }
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <Button name='hyvä' click_method={this.addOneClick('good_counter')}/>
                <Button name='neutraali' click_method={this.addOneClick('neutral_counter')}/>
                <Button name='huono' click_method={this.addOneClick('bad_counter')}/>
                <Statistics state={this.state}/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))