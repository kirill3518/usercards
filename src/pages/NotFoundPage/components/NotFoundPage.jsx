import React from 'react'
import { Stack, Paper, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
    const navigate = useNavigate()

    React.useEffect(
        () => {
            const isNotFoundPage = location.pathname === '/not-found'
            if (!isNotFoundPage) navigate('/not-found')
        },
        []
    )

    return (
        <Paper
            sx={{
                width: '30vw',
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}
            elevation={3}
        >
            <Stack
                justifyContent='space-evenly'
                alignItems='center'
                height='100%'
            >
                <Stack>
                    <Typography
                        variant='h2'
                        textAlign='center'
                    >
                        Error 404:
                    </Typography>

                    <Typography
                        variant='h4'
                        textAlign='center'
                    >
                        Страница не найдена.
                    </Typography>
                </Stack>

                <Button
                    color='secondary'
                    variant='contained'
                    sx={{ borderRadius: '20px' }}
                    onClick={() => navigate('/')}
                >
                    На главную
                </Button>
            </Stack>
        </Paper>
    )
}
