import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
    }),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({
        registerUser: build.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }),
        loginUser: build.mutation({
            query: (userData) => ({
                url: "/auth/login",
                method: "POST",
                body: userData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation
} = api