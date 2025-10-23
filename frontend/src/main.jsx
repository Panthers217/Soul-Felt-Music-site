import './firebase.js'; // Ensure Firebase initializes on app start

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ApiDataProvider } from './context/ApiDataContext.jsx';
import { CartProvider } from './context/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiDataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ApiDataProvider>
  </StrictMode>
);
