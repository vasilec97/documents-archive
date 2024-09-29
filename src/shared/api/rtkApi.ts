import { REQUEST_TAG } from "@/shared/const/tags"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const rtkApi = createApi({
  tagTypes: [REQUEST_TAG],
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
  }),
  endpoints: (builder) => ({}),
})
