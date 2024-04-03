import './App.css';
import React, { useEffect, useState } from 'react';

function TESTJOIN() {
    const [insertResultMsg, setInsertResultMsg] = useState("");

    async function joinPokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");

        const where = document.getElementById("whereclause").value;


        try {
            const response = await fetch('http://localhost:3001/join-pokemon-people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commonAttribute: where
                })
            })

            console.log("after fetch");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const messageElement = document.getElementById("joinResultPokemonMsg");
            if (responseData.success) {
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
                // fetchTableData();
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
        document.getElementById("joinPokemonTables").addEventListener("submit", joinPokemonTable);
        return () => {
            document.getElementById("joinPokemonTables").removeEventListener("submit", joinPokemonTable);
        };
    }, []);

    return (
        <div>
            <h2> JOIN POKEMON_CAUGHT and PEOPLE_HAS </h2>
            <form id="joinPokemonTables" style={{display: 'inline-block'}}>
                WHERE: <input type="text" id="whereclause" placeholder="Common Attribute" required/>
                <button type="submit"> Enter</button>
            </form>
            <div style={{display: 'inline-block'}}>
                <button onClick={clearPokemonList}> Clear Pokémon List</button>
            </div>
            <div id="joinResultPokemonMsg">{insertResultMsg}</div>

        </div>
    );
}

export default TESTJOIN;
