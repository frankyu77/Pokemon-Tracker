import './AddPage.css'
import { Link, useLocation } from 'react-router-dom'

function AddPage(props) {

    async function insertTable(input) {
        try {
            const response = await fetch('http://localhost:3001/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({input: input})
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

    const name = useLocation().state;

    const input = {}

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
                <input type="text" onChange={event => updateInput(input, attribute, event)}></input>
            </label>)
    }

    return form;
};

function updateInput(input, attribute, event) {
    if (['caught_since', 'owns_since', 'date_accepted'].includes(String(attribute).toLowerCase())) {
        console.log(new Date(event.target.value).toLocaleDateString('en-GB'))
        input[String(attribute).toLowerCase()] = `TO_DATE('${new Date(event.target.value).toLocaleDateString('en-GB')}', 'DD-MM-YYYY')`;
    } else {
        input[String(attribute).toLowerCase()] = event.target.value
    }
}

export default AddPage
