import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import StoreContext from './context/StoreContext.jsx';
import StoreContextProvider from './context/StoreContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>


)
