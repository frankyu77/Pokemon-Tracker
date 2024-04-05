import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TESTINGAPP from './App';
import REMOVE from './REMOVE';
import TESTING2 from './TESTING2'
import TESTJOIN from './TESTJOIN';
import NEWSELECTION from './NEWSELECTION';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import UPDATEPOKEMON from './UPDATEPOKEMON';
import AggregateQueryButton from './AggregateQueryButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
          {/*<h1 id='title'>Pokemon Game</h1>*/}
          {/*/!*<TESTINGAPP/>*!/*/}
          {/*/!*<REMOVE/>*!/*/}
          {/*<TESTING2/>*/}
          {/*<TESTJOIN/>*/}
          {/*<TESTSELECTION/>*/}
          {/*<NEWSELECTION/>*/}
          {/*<UPDATEPOKEMON/>*/}
          {/*<App/>*/}
          <div className="container">
                <h1 id='title'>Pokemon Game</h1>
              <div>
                  <div className="proj-join">
                      <TESTING2/>
                      <TESTJOIN/>
                  </div>
                  <NEWSELECTION/>
                  <UPDATEPOKEMON/>
                  <div className="aggregate-buttons">
                      <AggregateQueryButton aggregateName="average region count" fetchUrl="/average-region-count"/>
                      <AggregateQueryButton aggregateName="game with least regions" fetchUrl="/game-least-regions"/>
                      <AggregateQueryButton aggregateName="most popular type" fetchUrl="/type-most-popular"/>
                      <AggregateQueryButton aggregateName="game with all roles" fetchUrl="/game-all-roles"/>
                  </div>
                  <App/>
              </div>
          </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
