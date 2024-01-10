import { configureStore } from "@reduxjs/toolkit";
import mySlice from './slice'

var store = configureStore({

    reducer : {
        myTodoState : mySlice,     
    }
})

export default store;
