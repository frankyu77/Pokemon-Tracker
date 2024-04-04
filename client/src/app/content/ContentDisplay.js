import React, { useState, useEffect } from 'react';
import './ContentDisplay.css';
import AddPage from './pages/AddPage';
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
        items: ['Item#', 'Rarity', 'GameID', 'ItemName'],
        gym_includes: ['Gym#', 'Difficulty', 'Type', 'GameID'],
        region_apartof : ['RegionName', 'Type', "Gym#", "GameID"],
        enterableAreas : ['Area#', 'Type'],
        leadsTo : ['RegionName', 'Area#'],
        typeWeakness : ['Type', 'Weakness'],
        peopleHas: ['PID', 'GameID'],
        pokemon: ['Name', 'Type1', 'Type2', 'SpecialAttack', 'Caught_Since', 'PID'],
        badgeGym: ['Badge', 'Gym#', 'GameID'],
        gymMasters: ['PID', 'Name', 'Badge', 'Owns_Since'],
        roleCatchPhrase : ['Role', 'Catch_Phrase'],
        NPCLivesIn: ['PID', 'Name', 'Role', 'RegionName'],
        trainers: ['PID', 'Name', 'Fav_Pokemon'],
        difficultyReward : ['Difficulty', 'Reward'],
        quests: ['QuestID', 'Difficulty', 'PID', 'Date_Accepted']
    };

    const data = {
        game: gameData,
        //game: [['Game ID', 'Difficulty', 'Generation'], ['asdf', 'asdf', 'asdf']],
        items: itemData,
        gym_includes: gymIncludesData,
        region_apartof : regionApartofData,
        enterableAreas : enterableAreasData,
        leadsTo : leadsToData,
        typeWeakness : typeWeaknessData,
        peopleHas: peopleHasData,
        pokemon: pokemonData,
        badgeGym: badgeGymData,
        gymMasters: gymMastersData,
        roleCatchPhrase : roleCatchPhraseData,
        NPCLivesIn: NPCLivesInData,
        trainers: trainersData,
        difficultyReward : difficultyRewardData,
        quests: questsData
    };

    return (
        <div id="content-display">
            <Router>
                <Routes>
                    <Route exact path="/" element={<MainPage attributes={attributes} data={data} />} />
                    <Route exact path="/addpage" element={<AddPage attributes={attributes} data={data} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default ContentDisplay;

