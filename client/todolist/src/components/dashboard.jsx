
import { useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

function Dashboard() {

    const myProduct = useSelector(state => state.myTodoState.value)

  // Sample todo data
  const [todos, setTodos] = useState([
    { id: 1, title: 'Task 1' },
    { id: 2, title: 'Task 2' },
    { id: 3, title: 'Task 3' },
    // Add more todos here
    { id: 4, title: 'Task 4' },
    { id: 5, title: 'Task 5' },
    // ...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 3;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addTodo = () => {
    const newTodoId = todos.length + 1;
    setTodos([
      ...todos,
      { id: newTodoId, title: `Task ${newTodoId}` },
    ]);
  };

    


  return (
    <>

<div style={{height:"100vh",width:"100vw",display:"flex"}}>

<div style={{margin:'auto'}} >


<div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{color:"white"}} >Todo's</h2>
      <div style={{ margin: '20px 0' }}>
        <input className="form-control" style={{backgroundColor:"black",color:'white'}} type="text" placeholder="Search" />
        {/* Search functionality can be implemented here */}
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {currentTodos.map((todo) => (

     
          <li style={{color:"white"}}  key={todo.id}>{todo.title}</li>

        ))}
      </ul>
      <button onClick={addTodo} style={{ marginRight: '10px' }}>Add Todo</button>


     
      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }} onClick={() => paginate(currentPage - 1)} >1</button>

          <button style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }} onClick={() => paginate(currentPage + 1)} >2</button>

          <button style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '10px' }}  onClick={() => paginate(currentPage + 1)} >3</button>
        </div>
      </div>



      <div style={{display:'flex'}}>
        <div  >
        <input type="text" className="form-control" placeholder="Add Todos" />

        </div>

        <div>
        <button
            style={{
             
            }}
            onClick={addTodo}
          >
            +
          </button>
        </div>
        
      </div>


    </div>

    </div>
    </div>
    </>
  )
}

export default Dashboard
