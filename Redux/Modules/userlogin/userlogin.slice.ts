"use client";
import { createSlice } from "@reduxjs/toolkit";

import { IReduxUserLogin } from "./userlogin";

const reducerName = "userLogin";



export const initialState: IReduxUserLogin.IInitialLoginState = {
  userDetails: {
    id: "",
    scope: "",
    access_token: "",
    token_type: "",
    // fhngnhjgkmhkhk
  },
};

export const userLoginSlice = createSlice({
  name: reducerName,
  initialState,       
  reducers: {
   adduserDetails:(state:any,action:any)=>{
      state.userDetails = action.payload;
   }
  },
});


export const { adduserDetails } = userLoginSlice.actions;

export const userLoginSliceReducer = { [reducerName]: userLoginSlice.reducer };
