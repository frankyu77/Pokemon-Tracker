import './AddPage.css'
import { Link, useLocation } from 'react-router-dom'

function AddPage(props) {

    const name = useLocation().state;

    const input = {}

    return (
        <div id="add-page">
            <form id="add-form">{populateForm(input, props.attributes[name])}</form>

            <Link to='/'>
                <button onClick={() => updateData(input, props.attributes[name], props.data[name])}>Add</button>
            </Link>
        </div>
    );
}

const populateForm = (input, attributes) => {

    const form = []

    for (const attribute of attributes) {
        form.push(
            <label id="input-area"> 
                <span>{attribute}: </span>
                <input type="text" onChange={event => updateInput(input, attribute, event)}></input>
            </label>)
    }

    return form;
};

function updateInput(input, attribute, event) {
    input[attribute] = event.target.value
}

function updateData(input, attributes, data) {
    const row = [];

    for (const attribute of attributes) {
        if (!input[attribute] || input[attribute] === '') {
            return;
        }
        row.push(input[attribute])
    }

    data.push(row)
}

export default AddPage