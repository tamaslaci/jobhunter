import { createSlice } from "@reduxjs/toolkit";
import users from "../../data/users.json";

const userlistSlice = createSlice({
    name: "userlist",
    initialState: users,
    reducers: {
        addUser(state, action){
            state.push(action.payload);
        },
        updateUser(state, action){
            const id = action.payload.id;
            state.splice(id - 1, 1, action.payload);
        }
    }
});

export const { addUser, updateUser } = userlistSlice.actions;

export default userlistSlice.reducer;