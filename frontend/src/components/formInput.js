import * as React from 'react'


const inputStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
}


const FormInput = (props) => {
    let type = "text"
    if (props.type !== undefined) {
        type = props.type
    }
    return (
        <main>
        <h3>{props.title}</h3>
        <input type={type} id={props.id} name={props.name} style={inputStyle}/>
        </main>
    )
}

export default FormInput