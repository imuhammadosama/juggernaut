import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './general.css';
import App from './App';
import axios from 'axios';

// prettier-ignore
axios.defaults.baseURL = 
// 'http://localhost:1337/v1/api/';
'https://juggernaut-backend.herokuapp.com/v1/api/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
