import { createSlice } from "@reduxjs/toolkit";

const expertSlice=createSlice({
    name:'expert',
    initialState:{
        authToken:null,
        expertData: null
    },
    reducers:{
        setExpertAuthToken:(state,action)=>{
            state.authToken = `Bearer ${action.payload}`;
        },
        setExpertData: (state,action)=>{
            state.expertData = action.payload;
        }
    }
})

export const {setExpertAuthToken, setExpertData}=expertSlice.actions;
export default expertSlice.reducer;