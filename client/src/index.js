import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { AuthContext, dummyAuthValue } from './store/authContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={dummyAuthValue}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

