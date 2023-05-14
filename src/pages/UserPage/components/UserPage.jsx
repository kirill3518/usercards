import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from '../../../store/api'
import {
    Stack,
    Typography,
} from '@mui/material'

export const UserPage = () => {

    const { id } = useParams()

    const { data: user } = useGetUserByIdQuery(id)

    return (
        <Stack>
            <Typography>User card</Typography>
            <Typography>{user?.data.first_name}</Typography>
            <img src={user?.data?.avatar} alt={user?.data?.first_name} />
        </Stack>
    )
}