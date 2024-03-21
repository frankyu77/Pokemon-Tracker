import './App.css';
import EntityDisplay from './components/EntityDisplay';

function App() {

  const gameAttributes = ['Game ID', 'Difficulty', 'Generation']
  const gameData = [['a', 'b', 'c'], ['d', 'e', 'f']]

  const pokemonAttributes = ['Name', 'Type', 'Weakness', 'Special Attack']
  const pokemonData = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']]

  const itemsAttributes = ['Item #', 'Rarity']
  const itemsData = [['a', 'b'], ['c', 'd']]

  const peopleAttributes = ['Pid', 'Name']
  const peopleData = [['a', 'b'], ['c', 'd']]

  const gymsAttributes = ['Gym #', 'Type', 'Difficulty']
  const gymsData = [['a', 'b', 'c'], ['d', 'e', 'f']]

  const gymMastersAttributes = ['Pid', 'Name', 'Badge']
  const gymMastersData = [['a', 'b', 'c'], ['d', 'e', 'f']]

  const npcsAttributes = ['Pid', 'Name', 'Role', 'Catch Phrase']
  const npcsData = [['a', 'b', 'c', 'd'], ['e', 'f', 'g', 'h']]

  const trainersAttributes = ['Pid', 'Name', 'Favourite Pokemon']
  const trainersData = [['a', 'b', 'c'], ['d', 'e', 'f']]

  const regionsAttributes = ['Name', 'Type']
  const regionsData = [['a', 'b'], ['c', 'd']]

  const questsAttributes = ['Quest Id', 'Difficulty', 'Reward']
  const questsData = [['a', 'b', 'c'], ['d', 'e', 'f']]

  const enterableAreasAttributes = ['Area #', 'Type']
  const enterableAreasData = [['a', 'b'], ['c', 'd']]

  return (
    <div id='app'>
      <h1 id='title'>Pokemon Game</h1>
      <div id="data-display">
        <EntityDisplay name='game' attributes={gameAttributes} data={gameData}/>
        <EntityDisplay name='pokemon' attributes={pokemonAttributes} data={pokemonData}/>
        <EntityDisplay name='items' attributes={itemsAttributes} data={itemsData}/>

        <EntityDisplay name='people' attributes={peopleAttributes} data={peopleData}/>
        <EntityDisplay name='gyms' attributes={gymsAttributes} data={gymsData}/>
        <EntityDisplay name='gym masters' attributes={gymMastersAttributes} data={gymMastersData}/>

        <EntityDisplay name='npcs' attributes={npcsAttributes} data={npcsData}/>
        <EntityDisplay name='trainers' attributes={trainersAttributes} data={trainersData}/>
        <EntityDisplay name='regions' attributes={regionsAttributes} data={regionsData}/>

        <EntityDisplay name='quests' attributes={questsAttributes} data={questsData}/>
        <EntityDisplay name='enterable areas' attributes={enterableAreasAttributes} data={enterableAreasData}/>
      </div>
    </div>
  );
}

export default App;
