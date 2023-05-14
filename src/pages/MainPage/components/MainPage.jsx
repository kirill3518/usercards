import React from 'react'
import { useGetUsersQuery } from '../../../store/api'
import {
    Stack,
    Typography
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const MainPage = () => {

    const navigate = useNavigate()

    const { data: users } = useGetUsersQuery()

    return (
        <Stack
            display="flex"
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={2}
        >
            {React.Children.toArray(
                users?.data?.map(
                    (item) => (
                        <Stack
                            flexDirection='column'
                            alignItems='center'
                            onClick={() => navigate(`/users/${item.id}`)}
                        >
                            <Typography>{item.first_name}</Typography>
                            <Typography>{item.email}</Typography>
                            <img src={item.avatar} alt={item.first_name} />
                        </Stack>
                    )
                )
            )}
        </Stack>
    )
}