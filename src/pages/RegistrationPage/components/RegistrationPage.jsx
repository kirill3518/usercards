import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegistrationMutation } from '../../../store/api.js'
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const initialNewUser = {
    lastName: '',
    firstName: '',
    patronymicName: '',
    email: '',
    password: '',
}

const reducer = (state, action) => {
    if (!action.length) {
        return initialNewUser
    }

    const attrs = Object.fromEntries(
        action.map(
            (attr) => [attr.id, attr.value],
        )
    )

    return {
        ...state,
        ...attrs,
    }
}

const init = () => {
    return initialNewUser
}

export const RegistrationPage = () => {
    const [newUser, dispatch] = React.useReducer(reducer, initialNewUser, init)
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

    const navigate = useNavigate()

    const [registration, { isSuccess, isError, isLoading }] = useRegistrationMutation()

    React.useEffect(
        () => {
            if (isError) {
                navigate('/registration')
            }

            if (isSuccess) {
                navigate('/login')
            }
        },
        [isSuccess, isError],
    )

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        registration({
            lastName: newUser.lastName,
            firstName: newUser.firstName,
            patronymicName: newUser.patronymicName,
            email: newUser.email,
            password: newUser.password,
        })
    }

    const formRegistration = () => (
        <Stack
            component='form'
            onSubmit={onSubmit}
            method='POST'
            alignItems='flex-end'
            mx={10}
            spacing={4}
        >

            <TextField
                variant='filled'
                autoFocus
                margin='dense'
                type='text'
                placeholder='Иван'
                label='Имя'
                required
                fullWidth
                value={newUser.firstName}
                onChange={(e) => {
                    dispatch([
                        { id: 'firstName', value: e.target.value },
                    ])
                }}
            />

            <TextField
                variant='filled'
                autoFocus
                margin='dense'
                type='email'
                placeholder='pochta@pochta.com'
                label='Электронная почта'
                required
                fullWidth
                value={newUser.email}
                onChange={(e) => {
                    dispatch([
                        { id: 'email', value: e.target.value },
                    ])
                }}
            />

            <FormControl variant='filled' fullWidth sx={{ bgcolor: '#e8f1fe' }} required>
                <InputLabel htmlFor='filled-adornment-password'>Пароль</InputLabel>
                <FilledInput
                    id='filled-adornment-password'
                    type={showPassword ? 'text' : 'password'}
                    value={newUser.password}
                    placeholder='Пароль'
                    onChange={(e) => {
                        dispatch([
                            { id: 'password', value: e.target.value },
                        ])
                    }}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                edge='end'
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{ bgcolor: '#e8f1fe', ':hover': { bgcolor: '#e8f1fe' } }}
                />
            </FormControl>

            <FormControl variant='filled' fullWidth sx={{ bgcolor: '#e8f1fe' }} required>
                <InputLabel htmlFor='filled-adornment-confirm-password'>Подтвердите пароль</InputLabel>
                <FilledInput
                    id='filled-adornment-confirm-password'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    placeholder='Подтвердите пароль'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle confirm password visibility'
                                onClick={handleClickShowConfirmPassword}
                                edge='end'
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    sx={{ bgcolor: '#e8f1fe', ':hover': { bgcolor: '#e8f1fe' } }}
                />
            </FormControl>

            <Button
                type='submit'
                variant='contained'
                sx={{ borderRadius: '20px' }}
                fullWidth
                disabled={!newUser.password || !confirmPassword || newUser.password !== confirmPassword}
                color='secondary'
            >
                Зарегистрироваться
            </Button>
        </Stack>
    )

    const additionalButtons = () => (
        <Stack
            direction='row'
            spacing={1}
            justifyContent='center'
            mx={10}
        >
            <Button
                variant='outlined'
                sx={{ borderRadius: '20px' }}
                fullWidth
                onClick={() => navigate('/login')}
                color='secondary'
            >
                Авторизоваться
            </Button>

            <Button
                variant='outlined'
                sx={{ borderRadius: '20px' }}
                fullWidth
                onClick={() => navigate('/')}
                color='secondary'
            >
                На главную
            </Button>
        </Stack>
    )

    return (
        <Stack
            justifyContent='space-evenly' component={Paper} height='80%' width='30%'
        >
            <Typography
                variant='h4'
                sx={{
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
                mx={10}
            >
                Регистрация
            </Typography>

            {formRegistration()}

            {additionalButtons()}

        </Stack>
    )
}
