import './app/App.css';
import React, { useEffect, useState } from 'react';

function TESTSELECTION() {
    const [insertResultMsg, setInsertResultMsg] = useState("");

    async function joinPokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");

        const whichTable = document.getElementById("whichTable").value;
        const where = document.getElementById("whereClause").value;


        try {
            const response = await fetch('http://localhost:3001/selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableName: whichTable,
                    whereClause: where
                })
            })

            console.log("after fetch");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const messageElement = document.getElementById("selectionResultMsg");
            if (responseData.success) {
                document.getElementById("whichTable").value = "";
                document.getElementById("whereClause").value = "";
                // messageElement.textContent = "Data joined successfully!";
                // setInsertResultMsg("SUCCESS \n You Removed: " + pokemonName);
                // setInsertResultMsg(responseData.data);
                const attribute = Object.keys(responseData.data[0]);
                const dataRows = responseData.data.map((entry, index) => (
                    <tr key={index}>
                        {attribute.map((key, idx) => (
                            <td key={idx}>{entry[key]}</td>
                        ))}
                    </tr>
                ));
                const table = (
                    <table>
                        <thead>
                        <tr>
                            {attribute.map((key, idx) => (
                                <th key={idx}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {dataRows}
                        </tbody>
                    </table>
                );
                setInsertResultMsg(table);
            } else {
                messageElement.textContent = "Error removing data!";
                setInsertResultMsg("Error removing data!");

            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
            console.log(err);
            setInsertResultMsg("Error removing data!");
        }
    }

    const clearPokemonList = () => {
        setInsertResultMsg("");
    };

    // window.onload = () => {
    //     document.getElementById("insertPokemonTable").addEventListener("submit", insertPokemonTable);
    // }
    useEffect(() => {
        document.getElementById("selectionForm").addEventListener("submit", joinPokemonTable);
        return () => {
            document.getElementById("selectionForm").removeEventListener("submit", joinPokemonTable);
        };
    }, []);

    return (
        <div>
            <h2> SELECTION </h2>
            <form id="selectionForm" style={{display: 'inline-block'}}>
                TABLE: <input type="text" id="whichTable" placeholder="Enter table name" required/>
                CONDITION: <input type="text" id="whereClause" placeholder="Condition" style={{ width: '300px'}} required/>
                <button type="submit"> Enter</button>
            </form>
            <div style={{display: 'inline-block'}}>
                <button onClick={clearPokemonList}> Clear Pokémon List</button>
            </div>
            <div id="selectionResultMsg">{insertResultMsg}</div>

        </div>
    );
}

export default TESTSELECTION;
