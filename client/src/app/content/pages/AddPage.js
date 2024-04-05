import './AddPage.css'
import { Link, useLocation } from 'react-router-dom'

function AddPage(props) {

    const name = useLocation().state['name'];
    const tableName = useLocation().state['tableName'];

    const input = {}

    async function insertTable(input) {
        try {
            const response = await fetch('http://localhost:3001/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tableName: tableName, input: input })
            })

            console.log("after fetch");

            const responseData = await response.json();

            if (responseData.success) {
                console.log('Inserted successfully')
            } else {
                console.log("Error inserting data!");
            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
        }
    }

    return (
        <div id="add-page">
            <form id="add-form">{populateForm(input, props.attributes[name])}</form>

            <Link to='/'>
                <button onClick={() => insertTable(input)}>Add</button>
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
                <input type="text" onBlur={event => updateInput(input, attribute, event)}></input>
            </label>)
    }

    return form;
};

function updateInput(input, attribute, event) {
    input[String(attribute).toLowerCase()] = Number(event.target.value) || `'${event.target.value}'`;
}

export default AddPage
