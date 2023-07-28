import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './redux/Store';
import { Provider  } from 'react-redux';
import Footer from './components/Footer';
import { Container } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
