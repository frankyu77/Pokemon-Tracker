import React, { useState, useEffect } from 'react';
import './ContentDisplay.css';
import AddPage from './pages/AddPage';
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RemovePage from './pages/RemovePage';

function ContentDisplay() {
    const [formattedData, setFormattedData] = useState([]);
    const [gameData, setGameData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [gymIncludesData, setGymIncludesData] = useState([]);
    const [regionApartofData, setRegionApartofData] = useState([]);
    const [enterableAreasData, setEnterableAreasData] = useState([]);
    const [leadsToData, setLeadsToData] = useState([]);
    const [typeWeaknessData, setTypeWeaknessData] = useState([]);
    const [peopleHasData, setPeopleHas] = useState([]);
    const [pokemonData, setPokemonData] = useState([]);
    const [badgeGymData, setBadgeGymData] = useState([]);
    const [gymMastersData, setGymMastersData] = useState([]);
    const [roleCatchPhraseData, setRoleCatchPhraseData] = useState([]);
    const [NPCLivesInData, setNPCLivesInData] = useState([]);
    const [trainersData, setTrainersData] = useState([]);
    const [difficultyRewardData, setDifficultyRewardData] = useState([]);
    const [questsData, setquestsData] = useState([]);


    async function fetchData(tableName, setData) {
        try {
            const response = await fetch('http://localhost:3001/select-start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tableName: tableName
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const queryResult = responseData.data;

            const formattedData = [];
            // formattedData.push(['Name', 'Type1', 'Type2', 'Special Attack', 'Caught Since', 'PID']);

            if (responseData.success) {
                queryResult.forEach((item) => {
                    formattedData.push(Object.values(item));
                });
                setData(formattedData);
                return formattedData;
            }

            setFormattedData(formattedData);

            return formattedData; // Return the formatted data
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    useEffect(() => {
        fetchData('game', setGameData);
        fetchData('items_has', setItemData);
        fetchData('gym_includes', setGymIncludesData);
        fetchData('region_apartof', setRegionApartofData);
        fetchData('enterableAreas', setEnterableAreasData);
        fetchData('leadsTo', setLeadsToData);
        fetchData('type_Weakness', setTypeWeaknessData);
        fetchData('people_Has', setPeopleHas);
        fetchData('pokemon_caught', setPokemonData);
        fetchData('badge_Gym', setBadgeGymData);
        fetchData('GYMMASTER_OWNS', setGymMastersData);
        fetchData('role_CatchPhrase', setRoleCatchPhraseData);
        fetchData('NPC_LivesIn', setNPCLivesInData);
        fetchData('trainer', setTrainersData);
        fetchData('difficulty_Reward', setDifficultyRewardData);
        fetchData('quest_assigned', setquestsData);
    }, []);

    const attributes = {
        game: ['GameID', 'Game_Difficulty', 'Generation'],
        items_has: ['Item#', 'Rarity', 'GameID', 'ItemName'],
        gym_includes: ['Gym#', 'Difficulty', 'Type', 'GameID'],
        region_apartof : ['RegionName', 'Type', "Gym#", "GameID"],
        enterableAreas : ['Area#', 'Type'],
        leadsTo : ['RegionName', 'Area#'],
        type_Weakness : ['Type', 'Weakness'],
        people_Has: ['PID', 'GameID'],
        pokemon_caught: ['Name', 'Type1', 'Type2', 'SpecialAttack', 'Caught_Since', 'PID'],
        badge_Gym: ['Badge', 'Gym#', 'GameID'],
        GYMMASTER_OWNS: ['PID', 'Name', 'Badge', 'Owns_Since'],
        role_CatchPhrase : ['Role', 'Catch_Phrase'],
        NPC_LivesIn: ['PID', 'Name', 'Role', 'RegionName'],
        trainer: ['PID', 'Name', 'Fav_Pokemon'],
        difficulty_Reward : ['Difficulty', 'Reward'],
        quest_assigned: ['QuestID', 'Difficulty', 'PID', 'Date_Accepted']
    };

    const data = {
        game: gameData,
        //game: [['Game ID', 'Difficulty', 'Generation'], ['asdf', 'asdf', 'asdf']],
        items_has: itemData,
        gym_includes: gymIncludesData,
        region_apartof : regionApartofData,
        enterableAreas : enterableAreasData,
        leadsTo : leadsToData,
        type_Weakness : typeWeaknessData,
        people_Has: peopleHasData,
        pokemon_caught: pokemonData,
        badge_Gym: badgeGymData,
        GYMMASTER_OWNS: gymMastersData,
        role_CatchPhrase : roleCatchPhraseData,
        NPC_LivesIn: NPCLivesInData,
        trainer: trainersData,
        difficulty_Reward : difficultyRewardData,
        quest_assigned: questsData
    };

    return (
        <div id="content-display">
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainPage attributes={attributes} data={data} />} />
                    <Route exact path="/addpage" element={<AddPage attributes={attributes} data={data} />} />
                    <Route exact path="/removepage" element={<RemovePage attributes={attributes} data={data} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default ContentDisplay;

