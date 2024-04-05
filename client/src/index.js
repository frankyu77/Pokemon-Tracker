import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TESTINGAPP from './App';
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
          <div className="container">
                <h1 id='title'>Pokemon Game</h1>
              <div>
                  <hr/>
                  <div className="proj-join">
                      <TESTING2/>
                      <TESTJOIN/>
                  </div>
                  <hr/>
                  <NEWSELECTION/>
                  <hr/>
                  <UPDATEPOKEMON/>
                  <hr/>
                  <div className="aggregate-buttons">
                      <AggregateQueryButton aggregateName="average region count" fetchUrl="/average-region-count"/>
                      <AggregateQueryButton aggregateName="game with least regions" fetchUrl="/game-least-regions"/>
                      <AggregateQueryButton aggregateName="most popular type" fetchUrl="/type-most-popular"/>
                      <AggregateQueryButton aggregateName="game with all roles" fetchUrl="/game-all-roles"/>
                  </div>
                  <hr/>
                  <App/>
              </div>
          </div>
    </React.StrictMode>
);

reportWebVitals();
