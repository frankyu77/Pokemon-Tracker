import React, { useEffect, useState } from 'react';

function TESTING() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <div>
            <h2>Pokémon Caught</h2>
            <button id="fetchPokemonDataButton" disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Pokémon Data'}
            </button>
            <ul>
                <div></div>
                {pokemonList.map(pokemon => (
                    <li key={pokemon.NAME}>
                        <div>Name: {pokemon.NAME}</div>
                        <div>Type 1: {pokemon.TYPE1}</div>
                        <div>Type 2: {pokemon.TYPE2}</div>
                        <div>Special Attack: {pokemon.SPECIALATTACK}</div>
                        <div>Caught Since: {new Date(pokemon.CAUGHT_SINCE).toLocaleDateString()}</div>
                        <div>Player ID: {pokemon.PID}</div>
                        <br/>
                    </li>
                ))}



            </ul>
        </div>
    );
}

export default TESTING;
