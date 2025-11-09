import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished,setshowFinished]=useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()


  }

  const handleDelete = (e) => {
    let id = e.target.name
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()



  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    console.log(todos)
    saveToLS()

  }

  const handlechange = (e) => {
    settodo(e.target.value)

  }

  const handlecheckbox = (e) => {
    let id = e.target.name;
    console.log(id)
    let indexi = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[indexi].iscompleted = !newTodos[indexi].iscompleted
    settodos(newTodos)
    console.log(newTodos)
    saveToLS()


  }





  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh]">
        <h1 className='font-bold text-2xl text-center'>iTask - Manage your todos at one place</h1>
        <div className="addtodos"><h2 className='flex text-lg font-bold mt-3'>Add a Todo</h2></div>
        <div className='flex gap-4 mt-1 flex-col'><input className="w-full rounded-xl"  onChange={handlechange} value={todo} type="text" /><button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-lg text-sm font-bold'>Save</button></div>
        <div className="show flex mt-3 gap-2">
        <input className='' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> <div>Show Finished</div> 
        </div>
        
        <h2 className='flex text-lg font-bold mt-5'>Your Todos</h2>


        <div className="todos mt-2 gap-[5px]">
          {todos.length == 0 && <div className=''>No Todos to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.iscompleted) && <div key={item.id} className="todo flex ml-5 flex gap-3 mt-3 w-1/2 justify-between">
              <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} id="" />
              <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex gap-4 h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-lg text-sm font-bold'><FaEdit /></button>
                <button name={item.id} onClick={handleDelete} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-lg text-sm font-bold'><AiFillDelete /></button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
