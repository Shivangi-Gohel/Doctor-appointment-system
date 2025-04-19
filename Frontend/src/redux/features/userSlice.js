import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {setUsers} = userSlice.actions;