import './app/App.css';
import React, { useEffect, useState } from 'react';

function NEWSELECTION() {
    const [insertResultMsg, setInsertResultMsg] = useState("");
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedANDs, setSelectedANDs] = useState([]);

    async function joinPokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");
        console.log(selectedTypes);

        // const selectedAndConditions = selectedTypes.map(type => "type1 = '" + type + "'");

        // console.log(selectedAndConditions);
        console.log(selectedANDs);

        const orClause = selectedTypes.join(' OR ');
        const andClause = selectedANDs.join(' AND ');
        console.log(andClause);
        console.log(orClause);

        try {
            const response = await fetch('http://localhost:3001/selection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orClause: orClause,
                    andClause: andClause
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
        setSelectedTypes([]);
        setSelectedANDs([]);
        console.log("types = " + selectedTypes);
        console.log("ands = " + selectedANDs);
    };

    const handleTypeChange = (event) => {
        const type = event.target.value;
        if (event.target.checked) {
            const selectedANDsCopy = [...selectedANDs]; // Create a copy of selectedANDs
            setSelectedTypes([...selectedTypes.filter(item => !selectedANDsCopy.includes(item)), type]);
            setSelectedANDs(selectedANDs.filter(item => item !== type));
            selectedANDsCopy.forEach(orValue => {
                if (selectedTypes.includes(orValue)) {
                    console.log("Value from selectedANDs is already in selectedTypes");
                    // Do whatever you need to do if the value from selectedORs is already in selectedTypes
                }
            });
        } else {
            setSelectedTypes(selectedTypes.filter(item => item !== type));
        }
    };



    const handleOrChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setSelectedANDs([...selectedANDs, value]);
        } else {
            setSelectedANDs(selectedANDs.filter(item => item !== value));
        }
    }


    return (
        <div>
            <h3 style={{marginBottom: '0px'}}> SELECTION </h3>
            <form id="newSelectionForm" onSubmit={joinPokemonTable}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'left',}}>
                <div>
                    <h4 style={{display: 'flex', marginLeft: '20px', marginBottom: '0px'}}>OR:</h4>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="fireType" value="type1 = 'fire'" onChange={handleTypeChange}/>
                            <label htmlFor="fireType">fire</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="waterType" value="type1 = 'water'" onChange={handleTypeChange}/>
                            <label htmlFor="waterType">water</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="grassType" value="type1 = 'grass'" onChange={handleTypeChange}/>
                            <label htmlFor="grassType">grass</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="normalType" value="type1 = 'normal'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="normalType">normal</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="electricType" value="type1 = 'electric'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="electricType">electric</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="iceType" value="type1 = 'ice'" onChange={handleTypeChange}/>
                            <label htmlFor="iceType">ice</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="fightingType" value="type1 = 'fighting'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="fightingType">fighting</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="poisonType" value="type1 = 'poison'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="poisonType">poison</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="groundType" value="type1 = 'ground'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="groundType">ground</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="flyingType" value="type1 = 'flying'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="flyingType">flying</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="psychicType" value="type1 = 'psychic'"
                                   onChange={handleTypeChange}/>
                            <label htmlFor="psychicType">psychic</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="bugType" value="type1 = 'bug'" onChange={handleTypeChange}/>
                            <label htmlFor="bugType">bug</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{display: 'flex', marginLeft: '20px', marginBottom: '0px'}}>AND:</h4>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="pid12" value="pid > 12" onChange={handleOrChange}/>
                            <label htmlFor="pid12">reserved by pid 12 or greater</label>
                        </div>
                        <div style={{marginLeft: '10px'}}>
                            <input type="checkbox" id="type2poison" value="type2 = 'poison'" onChange={handleOrChange}/>
                            <label htmlFor="type2poison">type2 is poison</label>
                        </div>
                    </div>
                </div>

                <button type="submit" style={{display: 'flex', marginLeft: '10px', marginBottom: '0px', width: '3rem'}}>
                    Enter
                </button>
            </form>

            <div style={{display: 'inline-block', marginTop: '0srem', marginLeft: '10px', marginBottom: '2rem'}}>
                <button onClick={clearPokemonList}> Clear Pokémon List</button>
            </div>
            <div id="newSelectionResultMsg">{insertResultMsg}</div>
        </div>
    );
}

export default NEWSELECTION;
