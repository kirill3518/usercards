import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({ baseUrl: 'https://reqres.in/api' })

const baseQueryWithReauth = async (
    args,
    api,
    extraOptions,
) => {
    await mutex.waitForUnlock()

    const loginState = api.getState().login

    const getResult = async () => {
        switch (args.url) {
            case '/register':
                return baseQuery(args, api, extraOptions)

            case '/login':
                return baseQuery(args, api, extraOptions)

            default:
                return baseQuery(
                    {
                        ...args,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                    api,
                    extraOptions,
                )
        }
    }

    let result = getResult()

    if (result.error || result.data?.error) {
        const errorMessage =
            result.error?.data?.message
            || JSON.stringify(result.error)
            || result.data.message

        api.dispatch(
            showAlert({
                isShowAlert: true,
                severity: 'error',
                message: errorMessage,
            }),
        )

        if (!mutex.isLocked()) {
            const release = await mutex.acquire()

            try {
                api.dispatch(
                    loggedOut(),
                )
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()

            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const api = createApi({
    baseQuery: baseQueryWithReauth,

    tagTypes: ['Users', 'User'],

    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (dataNewUser) => ({
                url: '/login',
                method: 'POST',
                body: dataNewUser,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        updateUser: builder.mutation({
            query: (dataUpdatedUser) => ({
                url: '/users',
                method: 'PATCH',
                body: dataUpdatedUser,
            }),

            invalidatesTags: (result) => (
                result ? ['Users', 'User'] : []
            ),
        }),

        getPageById: builder.query({
            query: (pageId) => ({
                url: `/users?page=${pageId}`,
                method: 'GET',
            }),

            providesTags: ['Users'],
        }),
        getUserById: builder.query({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),

            providesTags: ['Users'],
        }),
    }),
})

export const {
    endpoints,
    useRegistrationMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useGetPageByIdQuery,
    useGetUserByIdQuery,
} = api
