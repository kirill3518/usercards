import React from 'react'
import { useGetPageByIdQuery } from '../../../store/api'
import {
    Stack,
    Typography,
    Avatar,
    Grid,
    Button,
    Pagination
} from '@mui/material'
import {
    useNavigate,
    useParams
} from 'react-router-dom'

export const MainPage = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { data: page, isSuccess } = useGetPageByIdQuery(id)

    const handleChange = (e, page) => {
        navigate(`/pages/${page}`)
    }

    return (
        <Stack
            direction="column"
            alignItems="center"
        >
            <Stack
                alignItems="center"
                padding="35px 90px"
                marginBottom="48px"
                sx={{
                    background: "#512689"
                }}
                color="white"
            >
                <Button
                    variant='contained'
                    sx={{
                        marginLeft: 'auto',
                        borderRadius: '20px',
                        backgroundColor: 'inherit',
                        borderColor: 'white',
                        alignSelf: "flex-end"
                    }}
                    onClick={() => navigate('/login')}
                >
                    Выход
                </Button>

                <Typography
                    variant="h2"
                    textAlign="center"
                    paddingBottom="16px"
                >
                    Наша команда
                </Typography>

                <Typography
                    variant="h6"
                    textAlign="center"
                >
                    Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
                </Typography>
            </Stack>

            <Grid container spacing={0}
                justifyContent="center"
                paddingBottom="60px"
                sx={{
                    gridRowGap: '20px',
                    gridColumnGap: '20px'
                }}
            >
                {React.Children.toArray(
                    page?.data?.map(
                        (item) => (
                            <Grid
                                onClick={() => navigate(`/users/${item.id}`)}
                            >
                                <Avatar
                                    alt={item.first_name}
                                    src={item.avatar}
                                    sx={{
                                        width: '124px',
                                        height: '124px',
                                        margin: '36px 90px 16px 90px'
                                    }}
                                />
                                <Typography
                                    fontSize="20px"
                                    marginBottom="16px"
                                    textAlign="center"
                                >
                                    {item.first_name}
                                </Typography>

                                <Typography
                                    fontSize="20px"
                                    marginBottom="16px"
                                    textAlign="center"
                                >
                                    {item.email}
                                </Typography>
                            </Grid>
                        )
                    )
                )}
            </Grid>
            <Pagination
                onChange={handleChange}
                count={2}
                variant="outlined"
                shape="rounded"
                sx={{
                    marginBottom: '75px',
                    ul: {
                        "& .MuiPaginationItem-root": {
                            color: "grey"
                        }
                    }
                }}
            />
        </Stack >
    )
}