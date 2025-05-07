import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginModel from './components/LoginModel.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginModel />
  </React.StrictMode>,
)
