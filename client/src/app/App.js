import './App.css';
import EntityDisplay from './components/EntityDisplay';

function App() {

  const pokemonData = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]

  return (
    <div class='app'>
      <h1 class='title'>Pokemon Game</h1>
      <EntityDisplay class='pokemon-entity' name='Pokemon' data={pokemonData}/>
    </div>
  );
}

export default App;
