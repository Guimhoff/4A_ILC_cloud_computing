// Step 1: Import React
import * as React from 'react'

// Step 2: Define your component
const FormInput = (props) => {
  return (
    <main>
      <h3>{props.title}</h3>
      <input type='text' id={props.id} name={props.name}/>
    </main>
  )
}

// Step 3: Export your component
export default FormInput