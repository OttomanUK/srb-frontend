import centralStore from "./reducer" 
import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger'
import {thunk} from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig,centralStore )  
export const store=configureStore({
    reducer:{centralStore:persistedReducer},
    devTools: process.env.NODE_ENV !== 'production',
    middleware: () => [thunk],

})
export const persistor = persistStore(store)