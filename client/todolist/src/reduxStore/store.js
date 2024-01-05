import { configureStore } from "@reduxjs/toolkit";
import mySlice from './slice'

var store = configureStore({

    reducer : {
        myTodoState : mySlice,     
    }
})

export default store;

// store.subscribe(()=>{
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
//   })