// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [insertResultMsg, setInsertResultMsg] = useState("");
  async function insertPokemonTable(event) {
    event.preventDefault();
    console.log("Form submitted!");

    const pokemonName = document.getElementById("insertPokemonName").value;
    const pokemonType1 = document.getElementById("insertPokemonType1").value;
    const pokemonType2 = document.getElementById("insertPokemonType2").value;
    const pokemonSpecialAttack = document.getElementById("insertPokemonAttack").value;
    const pokemonCaughtDate = document.getElementById("insertPokemonCaughtDate").value;
    const pokemonID = document.getElementById("insertPokemonID").value;
    console.log(pokemonName);
    console.log(pokemonType1);
    console.log(pokemonType2);
    console.log(pokemonSpecialAttack);
    console.log(pokemonCaughtDate);
    console.log(pokemonID);


    try {
      const response = await fetch('/insert-pokemon-caught', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: pokemonName,
          type1: pokemonType1,
          type2: pokemonType2,
          specialattack: pokemonSpecialAttack,
          caught_since: pokemonCaughtDate,
          pid: pokemonID
        })
      })

      console.log("after fetch");

      const responseData = await response.json();

      const messageElement = document.getElementById("insertResultPokemonMsg");
      if (responseData.success) {
        messageElement.textContent = "Data inserted successfully!";
        setInsertResultMsg("Data inserted successfully!");

        // fetchTableData();
      } else {
        messageElement.textContent = "Error inserting data!";
        setInsertResultMsg("Error inserting data!");

      }
    } catch (err) {
      console.log("ERRORRRRRRRR");
      console.log(err);
    }
  }

  // window.onload = () => {
  //     document.getElementById("insertPokemonTable").addEventListener("submit", insertPokemonTable);
  // }
  useEffect(() => {
    document.getElementById("insertPokemonTable").addEventListener("submit", insertPokemonTable);
    return () => {
      document.getElementById("insertPokemonTable").removeEventListener("submit", insertPokemonTable);
    };
  }, []);

  return (
      <div>
        <h2> Insert Values into DemoTable </h2>
        <form id="insertPokemonTable">
          Name: <input type="text" id="insertPokemonName" placeholder="Enter Pokemon Name" required/>
          Type1: <input type="text" id="insertPokemonType1" placeholder="Enter Pokemon Type"/>
          Type2: <input type="text" id="insertPokemonType2" placeholder="Enter Pokemon Type 2 (If Applicable)"/>
          Special_Attack: <input type="text" id="insertPokemonAttack" placeholder="Enter Pokemon Attack"/>
          Caught_Since: <input type="date" id="insertPokemonCaughtDate" placeholder="DD/MM/YYYY"/>
          PID: <input type="number" id="insertPokemonID" placeholder="Enter Pokemon ID"/>

          <button type="submit"> Enter </button>
        </form>
        <div id="insertResultPokemonMsg">{insertResultMsg}</div>
      </div>
  );
}

export default App;
