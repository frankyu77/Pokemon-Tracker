import './AddPage.css'
import { Link, useNavigate, useLocation} from 'react-router-dom'
import React, {useState} from "react";

function AddPage(props) {
    const [insertResultMsg, setInsertMsg] = useState("");
    const name = useLocation().state['name'];
    const tableName = useLocation().state['tableName'];
    const navigate = useNavigate();

    const input = {}

    const handleClick = () => {
        // Navigate to the specified path
        navigate('/');
    };

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
                console.log('Inserted successfully');
                setInsertMsg("Inserted successfully!");
                setTimeout(() => {
                    // Navigate to the specified path after 3 seconds
                    navigate('/');
                }, 3000);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                setInsertMsg(responseData.message|| "Error inserting!");
                console.log("Error inserting data!");
            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
        }
    }

    return (
        <div id="add-page">
            <form id="add-form">{populateForm(input, props.attributes[name])}</form>
                <button onClick={() => insertTable(input)}>Add</button>
            {insertResultMsg && <p>{insertResultMsg}</p>}
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
