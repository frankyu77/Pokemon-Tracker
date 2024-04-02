import React, { useEffect, useState, useCallback } from 'react';

function TESTING2() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isTableHeaderVisible, setIsTableHeaderVisible] = useState(false);
    const [selectedFields, setSelectedFields] =
        useState(['NAME', 'TYPE1', 'TYPE2', 'SPECIALATTACK', 'CAUGHT_SINCE', 'PID']);

    const fetchPokemonData = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/projection-pokemon-caught', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fields: selectedFields })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
                setPokemonList(data.data);
                setIsTableHeaderVisible(true);
            } else {
                console.error('Failed to fetch Pokémon caught data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching Pokémon caught data:', error);
        }
    }, [selectedFields]);

    useEffect(() => {
        document.getElementById("fetchPokemonDataButton2").addEventListener("click", fetchPokemonData);
        return () => {
            document.getElementById("fetchPokemonDataButton2").removeEventListener("click", fetchPokemonData);
        };
    }, [fetchPokemonData]);

    const clearPokemonList = () => {
        setPokemonList([]);
        setIsTableHeaderVisible(false);
    };

    const toggleFieldSelection = (fieldName) => {
        if (selectedFields.includes(fieldName)) {
            setSelectedFields(selectedFields.filter(field => field !== fieldName));
        } else {
            setSelectedFields([...selectedFields, fieldName]);
        }
    };

    return (
        <div>
            <h2>Pokémon Caught</h2>
            <button id="fetchPokemonDataButton2"> Projection Pokemon</button>
            <button onClick={clearPokemonList}> Clear Pokémon List</button>
            <div>
                {['NAME', 'TYPE1', 'TYPE2', 'SPECIALATTACK', 'CAUGHT_SINCE', 'PID'].map(fieldName => (
                    <button
                        key={fieldName}
                        style={{background: selectedFields.includes(fieldName) ? 'green' : 'grey'}}
                        onClick={() => toggleFieldSelection(fieldName)}
                    >
                        {fieldName}
                    </button>
                ))}
            </div>
            {isTableHeaderVisible && ( // Conditionally render the table header
                <table>
                    <thead>
                    <tr>
                        {selectedFields.map(fieldName => (
                            <th key={fieldName}>{fieldName}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {pokemonList.map((pokemon, index) => (
                        <tr key={index}>
                            {selectedFields.map(field => (
                                <td key={field}>{pokemon[field]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TESTING2;
