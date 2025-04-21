import { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Form from './components/Form';
import Progress from './components/Progress';
import DataShown from './components/DataShown';

function App() {
  const [todo, setTodo] = useState('');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);


  // localStorage

  function setLocal(d){
    localStorage.setItem("data",JSON.stringify(d))
    getLocal()
  }

  function getLocal(){
    let local = JSON.parse(localStorage.getItem("data")) || []
    setData(local)
  }

  useEffect(()=>{
        getLocal()
  },[])



  // Handle Add or Update
  function handleSubmit() {


    if (editId) {
      const updated = data.map((item) =>
        item.id === editId ? { ...item, todo } : item
      );
      setLocal(updated);
      setEditId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        todo,
        isChecked: false,
      };

        data.push(newTodo)
        // setData((prev) => [...prev, newTodo]);
        setLocal(data);
    }
    setTodo('');
  }

  // Delete a task
  function deleTodo(id) {
    const deleData = data.filter((ele) => ele.id !== id);
    setLocal(deleData);
  }

  // Toggle check/uncheck
  function checking(id) {
    const checked = data.map((ele) =>
      ele.id === id ? { ...ele, isChecked: !ele.isChecked } : ele
    );
    setLocal(checked);
  }

  // Prepare item for editing
  function updateData(id) {
    const task = data.find((item) => item.id === id);
    setTodo(task.todo);
    setEditId(id);
  }

  return (
    <>
      <div className="mx-auto p-3 mt-5 max-w-[370px] rounded-3xl" style={{ background: '#ECEEEE' }}>
        <div className="bg-white px-3 py-7 rounded-3xl">
          <div className="my-4 px-2">
            <h2 className="font-medium text-lg">Hello, Users 👋</h2>
            <h1 className="text-4xl font-bold">Your Tasks</h1>
          </div>

          <div className="container py-7 my-5 rounded-3xl">
            <div className="flex gap-2 px-4 py-5 text-white flex-col">
              <h1 className="text-4xl font-bold">Daily</h1>
              <h1 className="text-4xl font-bold">Tasks</h1>
            </div>

            {/* Progress Bar */}
            
                  <Progress data={data}/>
            {/* Input Form */}
                  <Form todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} editId={editId}/>
          </div>

          {/* Task List */}
                  <DataShown data={data }  checking={checking} deleTodo={deleTodo} updateData={updateData} />
        </div>
      </div>
    </>
  );
}

export default App;
