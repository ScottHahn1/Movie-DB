import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import './assets/fonts/Montserrat-Black.ttf';
import './assets/fonts/Poppins-Bold.ttf';
import './assets/fonts/Roboto-Regular.ttf';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);