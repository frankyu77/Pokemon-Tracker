import React, { useEffect, useState } from 'react';

function TESTING() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFields, setSelectedFields] =
        useState(['NAME', 'TYPE1', 'TYPE2', 'SPECIALATTACK', 'CAUGHT_SINCE', 'PID']);

    async function fetchPokemonData() {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/list-pokemon-caught', {
                method: 'POST'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.success) {
                setPokemonList(data.data);
            } else {
                console.error('Failed to fetch Pokémon caught data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching Pokémon caught data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        document.getElementById("fetchPokemonDataButton").addEventListener("click", fetchPokemonData);
        return () => {
            document.getElementById("fetchPokemonDataButton").removeEventListener("click", fetchPokemonData);
        };
    }, []);

    const clearPokemonList = () => {
        setPokemonList([]);
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
            <button id="fetchPokemonDataButton" disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Pokémon Data'}
            </button>
            <button onClick={clearPokemonList}>Clear Pokémon List</button>
            <div>
                <h3>Choose which field you would like to view:</h3>
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
            <ul>
                {pokemonList.map(pokemon => (
                    <li key={pokemon.NAME}>
                        {selectedFields.map(field => (
                            <div key={field}>
                                {field}: {pokemon[field]}
                            </div>
                        ))}
                        <br/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TESTING;
