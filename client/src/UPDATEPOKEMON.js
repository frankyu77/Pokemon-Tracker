import './app/App.css';
import React, { useEffect, useState } from 'react';

function UPDATEPOKEMON() {
    const [updateResultMsg, setUpdateResultMsg] = useState("");
    const [gameID, setGameID] = useState("");
    const [regionName, setRegionName] = useState("");
    const [gymNumber, setGymNumber] = useState("");

    async function updateRegionGym(event) {
        event.preventDefault();
        console.log("Form submitted!");

        try {
            const response = await fetch('http://localhost:3001/updatePokemon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameID: gameID,
                    regionName: regionName,
                    gymNum: gymNumber
                })
            })

            console.log("after fetch");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            if (responseData.success) {
                setUpdateResultMsg("Region gym updated successfully!");
            } else {
                setUpdateResultMsg("Error updating region gym!");
            }
        } catch (err) {
            console.error("Error updating region gym:", err);
            setUpdateResultMsg("Error updating region gym!");
        }
    }

    return (
        <div>
            <h2>Update Pokémon Region Gym</h2>
            <form onSubmit={updateRegionGym}>
                <label>
                    Region Name:
                    <input type="text" value={regionName} onChange={(e) => setRegionName(e.target.value)} required />
                </label>
                <label>
                    Game ID:
                    <input type="text" value={gameID} onChange={(e) => setGameID(e.target.value)} required />
                </label>
                <label>
                    Gym Number:
                    <input type="text" value={gymNumber} onChange={(e) => setGymNumber(e.target.value)} required />
                </label>
                <button type="submit">Update Gym</button>
            </form>
        </div>
    );
}

export default UPDATEPOKEMON;