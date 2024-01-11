import './App.css';
import { useState,useEffect,useRef } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function App() {
  const [toDos,setTodos] = useState([])
  const [toDo,setTodo] = useState('')
  const [editId, setEditId] = useState(0)

  const inputRef = useRef('null')
  useEffect(() => {
    inputRef.current.focus()
  })

  const addTodo = () => {
    if(toDo !== ''){
    setTodos([...toDos,{ list: toDo, id: Date.now(), status: false}]); 
    setTodo('');
    }
    if(editId){
      const editToDo = toDos.find((toDo) => toDo.id == editId)
      const updateToDo = toDos.map((to) => to.id === editToDo.id
      ? ( to = {id : to.id, list: toDo})
      : ( to = {id : to.id, list: to.list }))
      setTodos(updateToDo)
      setEditId(0)
      setTodo('')
    }
    }

  const onDelete = (id) =>{
    setTodos(toDos.filter((value) =>value.id!=id))
  }

  const onComplete =(id) =>{
    let complete = toDos.map((list) => {
      if(list.id === id){
          return ({...list, status : !list.status })
      }
      return list
    })
    setTodos(complete)
  }   

  const onEdit =(id) =>{
    const editTodo = toDos.find((value) => value.id === id)
    setTodo(editTodo.list) 
    setEditId(editTodo.id)
  }

  return (
    <div className="App">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2></h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setTodo(e.target.value)} ref={inputRef} type="text" placeholder="🖊️ Add item..." />
        <i onClick={() => addTodo() } className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((value) => {
              return(
                <div className="todo" id={value.status ? 'list-item' : ''}>
                <div className="left">
                  <input onClick={() => onComplete(value.id)} type="checkbox" name="" id="" />
                  <p>{value.list}</p>
                </div>
                <div className="right">
                  {/* <i className="fas fa-times"></i> */}
                  <FaEdit onClick={() => onEdit(value.id)} />
                  <MdDelete onClick={() => onDelete(value.id)}/>
                </div>
                </div>
              )
          })
        }

      </div>
    </div>
  );
}

export default App;
