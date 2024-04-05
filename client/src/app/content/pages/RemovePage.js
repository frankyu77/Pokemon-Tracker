import './RemovePage.css'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

function RemovePage(props) {

    const name = useLocation().state['name'];
    const tableName = useLocation().state['tableName'];

    const primaryKey = String(props.attributes[name][0]).toLowerCase();

    const [input, setInput] = useState("");

    async function removeData(input) {
        try {
            const sql = `DELETE FROM ${tableName} WHERE ${primaryKey} = ${input}`
            console.log(sql);
            const response = await fetch('http://localhost:3001/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tableName: tableName, primaryKey: primaryKey, input: input })
            })

            console.log("after fetch");

            const responseData = await response.json();

            if (responseData.success) {
                console.log('Removed successfully')
            } else {
                console.log("Error removing data!");
            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
        }
    }

    return (
        <div id="remove-page">
            <form id="remove-form">
                <label id="input-area">
                    <span>{primaryKey}: </span>
                    <input type="text" onBlur={event => setInput(event.target.value)}></input>
                </label>
            </form>

            <Link to='/'>
                <button onClick={() => removeData(input)}>Remove</button>
            </Link>
        </div>
    );
}

export default RemovePage
