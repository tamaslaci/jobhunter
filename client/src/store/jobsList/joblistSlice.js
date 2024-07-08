import { createSlice } from "@reduxjs/toolkit";
import advertisements from "../../data/advertisements.json";

const joblistSlice = createSlice({
    name: "joblist",
    initialState: advertisements,
    reducers: {
        addJob(state, action){
            state.push(action.payload);
        },
        updateJob(state, action){
            const idx = state.findIndex((job) => job.id === action.payload.id);
            state.splice(idx, 1, action.payload);
        },
        deleteJob(state, action){
            const idx = state.findIndex((job) => job.id === action.payload.id);
            state.splice(idx, 1);
        }
    }
});

export const { addJob, updateJob, deleteJob } = joblistSlice.actions;

export default joblistSlice.reducer;