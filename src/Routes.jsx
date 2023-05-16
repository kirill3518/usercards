import React from 'react'
import {
    Routes as Switch,
    Route,
} from 'react-router-dom'
import {
    MainPage,
    LoginPage,
    RegistrationPage,
    UserPage,
    NotFoundPage,
} from './pages'

export const Routes = () => (
    <Switch>
        <Route
            path='/'
            element={<MainPage />}
        />
        <Route
            path='/pages/:id'
            element={<MainPage />}
        />
        <Route
            path='/login'
            element={<LoginPage />}
        />
        <Route
            path='/registration'
            element={<RegistrationPage />}
        />
        <Route
            path='/users/:id'
            element={<UserPage />}
        />
        <Route
            path='not-found'
            element={<NotFoundPage />}
        />
        <Route
            path='*'
            element={<NotFoundPage />}
        />
    </Switch>
)
