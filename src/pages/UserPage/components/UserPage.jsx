import React from 'react'
import {
    useParams,
    useNavigate,
} from 'react-router-dom'
import { useGetUserByIdQuery } from '../../../store/api'
import {
    Stack,
    Typography,
    Avatar,
    Button,
} from '@mui/material'
import {
    Phone,
    Email
} from '@mui/icons-material'

export const UserPage = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const { data: user } = useGetUserByIdQuery(id)

    return (
        <Stack
            direction="column"
        >
            <Stack
                direction="row"
                alignItems="flex-start"
                padding="39px 90px"
                sx={{
                    background: "#512689"
                }}
                color="white"
            >
                <Stack
                    direction="row"
                    alignItems="flex-start"
                >
                    <Button
                        variant='contained'
                        sx={{
                            borderRadius: '20px',
                            backgroundColor: 'inherit',
                            borderColor: 'white'
                        }}
                        onClick={() => navigate('/')}
                    >
                        На главную
                    </Button>
                    <Avatar
                        alt={user?.data?.first_name}
                        src={user?.data?.avatar}
                        sx={{
                            width: '187px',
                            height: '187px',
                            margin: '0px 32px'
                        }}
                    />
                    <Stack
                        alignItems="flex-start"
                        margin="auto 0px"
                        textAlign="center"
                    >
                        <Typography
                            variant="h2"
                            textAlign="center"
                            paddingBottom="16px"
                        >
                            {user?.data.first_name}
                        </Typography>

                        <Typography
                            variant="h5"
                            textAlign="center"
                            paddingBottom="16px"
                        >
                            Партнер
                        </Typography>
                    </Stack>
                </Stack>

                <Button
                    variant='contained'
                    sx={{
                        marginLeft: 'auto',
                        borderRadius: '20px',
                        backgroundColor: 'inherit',
                        borderColor: 'white'
                    }}
                    onClick={() => navigate('/login')}
                >
                    Выход
                </Button>
            </Stack>

            <Stack
                direction="row"
                margin="49px 188px auto 188px"
            >
                <Stack
                    maxWidth="630px"
                    fontSize="16px"
                >
                    <Typography
                        paddingBottom="25px"
                    >
                        Клиенты видят в этом сотруднике эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
                    </Typography>
                    <Typography
                        paddingBottom="25px"
                    >
                        В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
                    </Typography>
                    <Typography>
                        Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
                    </Typography>
                </Stack>

                <Stack
                    paddingLeft="131px"
                >
                    <Typography
                        paddingBottom="25px"
                    >
                        <Phone
                            sx={{
                                margin: '0px 10px -7.5px auto'
                            }}
                        />
                        +7 (954) 333-44-55

                    </Typography>

                    <Typography>
                        <Email
                            sx={{
                                margin: '0px 10px -7.5px 0px'
                            }}
                        />
                        {user?.data.email}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}