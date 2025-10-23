import './firebase.js'; // Ensure Firebase initializes on app start

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ApiDataProvider } from './context/ApiDataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { FeaturesProvider } from './context/FeaturesContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <FeaturesProvider>
        <ApiDataProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ApiDataProvider>
      </FeaturesProvider>
    </ThemeProvider>
  </StrictMode>
);
