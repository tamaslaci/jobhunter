import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApiSlice = createApi({
    reducerPath: "jobhunterApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3030"}),
    endpoints: builder => ({
        getAllJobs: builder.query({
            query: () => "/jobs"
        }),
        addNewJob: builder.mutation({
            query: job => ({
                url: "/jobs",
                method: "POST",
                body: job
            })
        })
    })
});

export const {useGetAllJobsQuery, useAddNewJobMutation} = jobsApiSlice;