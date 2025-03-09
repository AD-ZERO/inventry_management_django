import React from 'react';
import './index.css'; // You can add your global styles here
import App from './App'; // Import the root component of your app
import {createRoot} from 'react-dom/client';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render the root component (App) inside the div with id="root" in index.html
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
