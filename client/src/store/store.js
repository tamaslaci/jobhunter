import { configureStore } from "@reduxjs/toolkit";
import joblistReducer from "./jobsList/joblistSlice";
import { jobsApiSlice } from "./jobhunter/jobsApiSlice";
import userlistReducer from "./userList/userlistSlice";

export const store = configureStore({
    reducer: {
        joblist: joblistReducer,
        userlist: userlistReducer,
        jobhunterApi: jobsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jobsApiSlice.middleware),
});