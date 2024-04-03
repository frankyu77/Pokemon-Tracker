import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TESTINGAPP from './App';
import REMOVE from './REMOVE';
import TESTING2 from './TESTING2'
import TESTJOIN from './TESTJOIN';
import TESTSELECTION from './TESTSELECTION';
import NEWSELECTION from './NEWSELECTION';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <TESTINGAPP />
      <REMOVE />
      <TESTING2 />
      <TESTJOIN />
      <TESTSELECTION />
      <NEWSELECTION />
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
