import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <div>
            <h1>{props.kurssi}</h1>
        </div>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa nimi={props.osa1.nimi} lkm={props.osa1.tehtavia}/>
            <Osa nimi={props.osa2.nimi} lkm={props.osa2.tehtavia}/>
            <Osa nimi={props.osa3.nimi} lkm={props.osa3.tehtavia}/>

        </div>
    )
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <div>
            <p>{props.nimi} {props.lkm}</p>
        </div>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            }
        ]
    }

    return (
        <div>
            <Otsikko kurssi={kurssi.nimi}/>
            <Sisalto osa1={kurssi.osat[0]} osa2={kurssi.osat[1]} osa3={kurssi.osat[2]}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
