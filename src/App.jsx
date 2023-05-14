import React from 'react'
import './utils/reset.sass'
import { HashRouter } from 'react-router-dom'
import { Routes } from './Routes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store/store'

export const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
                <Routes />
            </HashRouter>
        </PersistGate>
    </Provider>
)
