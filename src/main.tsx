// src/main.tsx (Corrected and Final)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext'; // <-- Import ThemeProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ThemeProvider> {/* <-- Wrap your app */}
          <App />
          <Toaster position="top-right" />
        </ThemeProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
);