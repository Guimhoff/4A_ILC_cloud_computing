import * as React from 'react';
import Piou from './piou.js'
import * as styles from '../styles/globalStyles.js'


const PiouList = (props) => {

    const pious = props.pious

    function drawPious() {
        const piouList = []
        for (let i = 0; i < pious.length; i++) {
            const piou = pious[i]
            piouList.push(<Piou text={piou.text} author={piou["pseudo-user"]} key={i} />)
        }
        return piouList
    }
    
    return (
        <ul style={styles.piouListStyle}>{drawPious()}</ul>
    )
}

export default PiouList








