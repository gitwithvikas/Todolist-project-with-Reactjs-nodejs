import { createSlice } from "@reduxjs/toolkit";

var cartSlice = createSlice({

    name: 'todolist',

    initialState: {
        value: [],
        userStatus:false
    },

    reducers: {

        addTodo: (state, action) => {
            var ob = { cart: action.payload, qty: 1 }
            state.value = [...state.value, ob]
        },

        
        deleteTodo: (state, action) => {
            var pid = action.payload.pid
            state.value = state.value.filter(item => item.cart._id != pid)
        },


        removeAllItems: (state) => {
            state.value = [] 
        
        },


        updateUser: (state, action) => {
          
            state.userStatus = action.payload
        },





    }
})
export const { addTodo,deleteTodo, removeAllItems,updateUser } = cartSlice.actions

export default cartSlice.reducer;