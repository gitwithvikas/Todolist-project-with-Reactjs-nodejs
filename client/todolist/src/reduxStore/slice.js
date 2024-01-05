import { createSlice } from "@reduxjs/toolkit";

// const data = localStorage.getItem('reduxState') 
// console.log(JSON.parse(data).myTodoState)
var status = localStorage.getItem('userStatus')
if(status){
    status = status
}else{
    status = false
}


var cartSlice = createSlice({

    name: 'todolist',

    initialState: {
        value:[] ,
        userStatus:status  
    },

    reducers: {

        fetchAllData:(state,action)=>{
            state.value = action.payload
        },

        addTodo: (state, action) => {
              const data = action.payload
              return  {...state, value:[...state.value,data[0]]}
        },

        
        deleteTodo: (state, action) => {
            var pid = action.payload
            console.log('sliceid', pid)
            state.value = state.value.filter(todo => todo.id != pid)
        },


        removeAllItems: (state) => {
            state.value = [] 
        
        },

        updateUser:(state,action)=>{
            state.userStatus = action.payload

        },


        updateUserTodo: (state, action) => {
            const data = action.payload
            console.log('updateslice',data)
            return {
                ...state,
                value: state.value.map((todo) =>
                  todo.id === data[0].id ? { ...todo, discription:data[0].discription } : todo
                ),
              };
        },

    }
})
export const { fetchAllData,addTodo,deleteTodo, removeAllItems,updateUser,updateUserTodo } = cartSlice.actions

export default cartSlice.reducer;