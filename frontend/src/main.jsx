
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ApiDataProvider } from './context/ApiDataContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiDataProvider>
      <App />
    </ApiDataProvider>
  </StrictMode>
);
