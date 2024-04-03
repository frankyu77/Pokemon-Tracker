import './app/App.css';
import React, { useEffect, useState } from 'react';

function NEWSELECTION() {
    const [insertResultMsg, setInsertResultMsg] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);

    async function joinPokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");

        const selectedConditions = selectedTypes.map(type => "type1 = '" + type + "'");
        console.log(selectedConditions);

        const orClause = selectedConditions.join(' OR ');
        console.log(orClause);

        try {
            const response = await fetch('http://localhost:3001/selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orClause: orClause
                })
            });

            console.log("after fetch");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            const messageElement = document.getElementById("newSelectionResultMsg");
            if (responseData.success) {
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

                const newSelectedTypes = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(checkbox => checkbox.value);
                setSelectedTypes(newSelectedTypes);
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

    const handleTypeChange = (event) => {
        const type = event.target.value;
        if (event.target.checked) {
            setSelectedTypes([...selectedTypes, type]);
        } else {
            setSelectedTypes(selectedTypes.filter(item => item !== type));
        }
    };


    return (
        <div>
            <h2> SELECTION </h2>
            <form id="newSelectionForm" onSubmit={joinPokemonTable}
                  style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>

                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="fireType" value="fire" onChange={handleTypeChange}/>
                    <label htmlFor="fireType">fire</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="waterType" value="water" onChange={handleTypeChange}/>
                    <label htmlFor="waterType">water</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="grassType" value="grass" onChange={handleTypeChange}/>
                    <label htmlFor="grassType">grass</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="normalType" value="normal" onChange={handleTypeChange}/>
                    <label htmlFor="normalType">normal</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="electricType" value="electric" onChange={handleTypeChange}/>
                    <label htmlFor="electricType">electric</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="iceType" value="ice" onChange={handleTypeChange}/>
                    <label htmlFor="iceType">ice</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="fightingType" value="fighting" onChange={handleTypeChange}/>
                    <label htmlFor="fightingType">fighting</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="poisonType" value="poison" onChange={handleTypeChange}/>
                    <label htmlFor="poisonType">poison</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="groundType" value="ground" onChange={handleTypeChange}/>
                    <label htmlFor="groundType">ground</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="flyingType" value="flying" onChange={handleTypeChange}/>
                    <label htmlFor="flyingType">flying</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="psychicType" value="psychic" onChange={handleTypeChange}/>
                    <label htmlFor="psychicType">psychic</label>
                </div>
                <div style={{display: 'flex', marginLeft: '10px'}}>
                    <input type="checkbox" id="bugType" value="bug" onChange={handleTypeChange}/>
                    <label htmlFor="bugType">bug</label>
                </div>


                {/* Add more checkboxes for other types as needed */}

                <button type="submit" style={{display: 'flex', marginLeft: '10px', marginBottom: '1rem'}}> Enter</button>
            </form>
            <div style={{display: 'inline-block'}}>
                <button onClick={clearPokemonList}> Clear Pokémon List</button>
            </div>
            <div id="newSelectionResultMsg">{insertResultMsg}</div>
        </div>
    );
}

export default NEWSELECTION;
