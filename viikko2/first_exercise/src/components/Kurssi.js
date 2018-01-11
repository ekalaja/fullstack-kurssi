import React from 'react'

const Kurssi = ({ kurssi }) => {
    const osat = () => kurssi.osat.map(osa => (<li key={osa.id}>{osa.nimi}</li>))
    var yhteensa = kurssi.osat.reduce(function(prev, curr) {
        return prev +  curr.tehtavia;
    },0);
    return (
        <div>
            <h3>{kurssi.nimi}</h3>
            {osat()}
            <p>yhteensä {yhteensa} tehtävää</p>
        </div>
    )

}

export default Kurssi