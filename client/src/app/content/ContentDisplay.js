import './ContentDisplay.css';
import AddPage from './pages/AddPage';
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function ContentDisplay() {

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
    }

    const data = {
        game: [['Game ID', 'Difficulty', 'Generation']],
        items: [['Item #', 'Rarity', 'Game ID', 'Item Name']],
        gym_includes: [['Gym #', 'Difficulty', 'Type', 'Game ID']],
        region_apartof : [['Name', 'Type', "Gym #", "Game ID"]],
        enterableAreas : [['Area #', 'Type']],
        leadsTo : [['Region Name', 'Area #']],
        typeWeakness : [['Type', 'Weakness']],
        peopleHas: [['PID', 'Game ID']],
        pokemon: [['Name', 'Type1', 'Type2', 'Special Attack', 'asdfasd', 'PID']],
        badgeGym: [['Badge', 'Gym #', 'Game ID']],
        gymMasters: [['PID', 'Name', 'Badge', 'Owns_Since']],
        roleCatchPhrase : [['Role', 'Catch_Phrase']],
        NPCLivesIn: [['Pid', 'Name', 'Role', 'Catch_Phrase']],
        trainers: [['PID', 'Name', 'Favourite Pokemon']],
        difficultyReward : [['Difficulty', 'Reward']],
        quests: [['Quest ID', 'Difficulty', 'PID', 'Date_Accepted']]
    }

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
