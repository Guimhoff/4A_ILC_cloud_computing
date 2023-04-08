import * as React from 'react'
import * as styles from '../styles/globalStyles.js'


// Standard input
const FormInput = (props) => {
    let type = "text"
    if (props.type !== undefined) {
        type = props.type
    }
    return (
        <main>
        <h3>{props.title}</h3>
        <input type={type} id={props.id} name={props.name} style={styles.inputStyle}/>
        </main>
    )
}

export default FormInput