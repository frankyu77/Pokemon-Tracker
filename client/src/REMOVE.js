import './App.css';
import React, { useEffect, useState } from 'react';

function REMOVE() {
    const [insertResultMsg, setInsertResultMsg] = useState("");
    const [isError, setIsError] = useState(false);

    async function removePokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");

        const pokemonName = document.getElementById("removePokemonName").value;
        console.log(pokemonName);


        try {
            const response = await fetch('http://localhost:3001/remove-pokemon-caught', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: pokemonName
                })
            })

            console.log("after fetch");

            const responseData = await response.json();

            const messageElement = document.getElementById("removeResultPokemonMsg");
            if (responseData.success) {
                messageElement.textContent = "Data removed successfully!";
                setInsertResultMsg("SUCCESS \n You Removed: " + pokemonName);
                //setInsertResultMsg("Data inserted successfully!");

                // fetchTableData();
            } else {
                messageElement.textContent = "Error removing data!";
                setIsError(true); // Set isError to true if there's an error
                setInsertResultMsg("Error removing data!");

            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
            console.log(err);
            setIsError(true);
            setInsertResultMsg("Error removing data!");
        }
    }

    // window.onload = () => {
    //     document.getElementById("insertPokemonTable").addEventListener("submit", insertPokemonTable);
    // }
    useEffect(() => {
        document.getElementById("removePokemonTable").addEventListener("submit", removePokemonTable);
        return () => {
            document.getElementById("removePokemonTable").removeEventListener("submit", removePokemonTable);
        };
    }, []);

    return (
        <div>
            <h2> REMOVE Values into DemoTable </h2>
            <form id="removePokemonTable">
                Name: <input type="text" id="removePokemonName" placeholder="Enter Pokemon Name" required/>

                <button type="submit"> Enter</button>
            </form>
            {/*<div id="insertResultPokemonMsg">{insertResultMsg}</div>*/}
            <div id="removeResultPokemonMsg" className={isError ? "error" : "noError"}>{insertResultMsg}</div>

        </div>
    );
}

export default REMOVE;
