import './ContentDisplay.css';
import AddPage from './pages/AddPage';
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function ContentDisplay() {

    const attributes = {
        game: ['Game ID', 'Difficulty', 'Generation'],
        pokemon: ['Name', 'Type', 'Weakness', 'Special Attack'],
        items: ['Item #', 'Rarity'],
        people: ['Pid', 'Name'],
        gyms: ['Gym #', 'Type', 'Difficulty'],
        "gym masters": ['Pid', 'Name', 'Badge'],
        npcs: ['Pid', 'Name', 'Role', 'Catch Phrase'],
        trainers: ['Pid', 'Name', 'Favourite Pokemon'],
        regions: ['Name', 'Type'],
        quests: ['Quest Id', 'Difficulty', 'Reward'],
        "enterable areas": ['Area #', 'Type']
    }

    const data = {
        game: [['a', 'b', 'c'], ['d', 'e', 'f']],
        pokemon: [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']],
        items: [['a', 'b'], ['c', 'd']],
        people: [['a', 'b'], ['c', 'd']],
        gyms: [['a', 'b', 'c'], ['d', 'e', 'f']],
        "gym masters": [['a', 'b', 'c'], ['d', 'e', 'f']],
        npcs: [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']],
        trainers: [['a', 'b', 'c'], ['d', 'e', 'f']],
        regions: [['a', 'b'], ['c', 'd']],
        quests: [['a', 'b', 'c'], ['d', 'e', 'f']],
        "enterable areas": [['a', 'b'], ['c', 'd']]
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