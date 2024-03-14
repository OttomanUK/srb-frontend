import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './components/utils/ThemeContext';
import App from "./App";
import {persistor,store} from "./redux_store/store"
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>    
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </PersistGate>    
  </Provider>
</React.StrictMode>
);
