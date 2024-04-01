import React, { useState } from 'react';

const PokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPokemonData = () => {
        setLoading(true);
        fetch('/list-pokemon-caught')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPokemonList(data.data);
                } else {
                    console.error('Failed to fetch Pokémon caught data:', data.error);
                }
            })
            .catch(error => console.error('Error fetching Pokémon caught data:', error))
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h2>Pokémon Caught</h2>
            <button onClick={fetchPokemonData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Pokémon Data'}
            </button>
            <ul>
                {pokemonList.map(pokemon => (
                    <li key={pokemon.pid}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default PokemonList;
