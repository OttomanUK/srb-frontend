import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './components/utils/ThemeContext';
import App from "./App";
import {store} from "./redux_store/store"
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>
  </Provider>
);
