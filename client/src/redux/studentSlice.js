import { createSlice } from "@reduxjs/toolkit";

const studentSlice=createSlice({
    name:'student',
    initialState:{
        authToken:null,
        studentdata: null
    },
    reducers:{
        setStudentAuthToken:(state,action)=>{
            state.authToken = `Bearer ${action.payload}`;
        },
        setStudentData: (state,action)=>{
            state.data = action.payload;
        }
    }
})

export const {setStudentAuthToken, setStudentData}=studentSlice.actions;
export default studentSlice.reducer;