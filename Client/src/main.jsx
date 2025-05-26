import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Error from '../Error';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Error>
      <App />
      
    </Error>
  </React.StrictMode>
);
