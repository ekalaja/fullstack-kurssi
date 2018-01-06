import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        var myArray = new Array()
        const anecdotes = props.anecdotes
        for (var i = 0; i < props.anecdotes.length; i++) {
            myArray[i] = 0
        }
        this.state = {
            selected: 0,
            list_size: props.anecdotes.length,
            anecdotes: anecdotes,
            myArray: myArray,
            votes: 0
        }

    }

    newRandomAnecdote()  {
        const randomNumber = Math.floor(Math.random() * (this.state.list_size))
        const votesOfnew = this.state.myArray[randomNumber]
        this.setState({
            selected: randomNumber,
        })
        this.setState({
            votes: votesOfnew
        })
    }

    voteAnecdote() {
        var copyOfArray = this.state.myArray.slice();
        const indexOfAnecdote = this.state.selected
        const prevValue = this.state.myArray[indexOfAnecdote]
        copyOfArray[indexOfAnecdote] = prevValue + 1
        this.setState({
            myArray: copyOfArray
        })
        this.setState({
            votes: copyOfArray[indexOfAnecdote]
        })
    }

    mostVotes() {
        var indexOfMostVotes = -1
        var votes = 0
        for (var i = 0; i < this.state.list_size; i++) {
            if (this.state.myArray[i] > votes) {
                indexOfMostVotes = i
                votes = this.state.myArray[i]
            }
        }
        if (votes === 0) {
            return(
                <div>no votes given</div>
            )
        }
        return (
                <div>
                    <h2>anecdote with most votes</h2>
                    <p>{this.props.anecdotes[indexOfMostVotes]}</p>
                    <p>has {votes} votes</p>

                </div>
        )
    }


    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <p>has {this.state.votes} votes</p>
                <button onClick={this.newRandomAnecdote.bind(this)}>
                    next anecdote
                </button>
                <button onClick={this.voteAnecdote.bind(this)}>
                    vote anecdote
                </button>
                {this.mostVotes()}
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
