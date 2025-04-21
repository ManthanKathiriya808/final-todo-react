import { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { Line } from 'rc-progress';

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
            <div className="p-5 flex items-center">
              {data.length > 0 && (
                <>
                  <div className="flex-grow">
                    <Line
                      percent={((data.filter((item) => item.isChecked).length / data.length) * 100).toFixed(0)}
                      strokeWidth={8}
                      strokeColor="#D3D3D3"
                    />
                  </div>
                  <div className="text-2xl font-bold py-3 px-4 text-white">
                    <div className="flex gap-1">
                      {data.reduce((total, item) => total + item.isChecked, 0)}
                      <p>/</p>
                      {data.length}
                    </div>
                    <div>Task</div>
                  </div>
                </>
              )}
            </div>

            {/* Input Form */}
            <div className="px-4">
              <form
                className="form-container"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="input-container">
                  <input
                    type="text"
                    className="input px-5 font-2xl"
                    placeholder="Add new task..."
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                  />
                  <div className="icon-left">
                    <span className="plus-icon">➕</span>
                  </div>
                  <button type="submit" className="icon-right" title="Add Task">
                    {editId ? '✅' : '📒'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Task List */}
          <div className="shadow p-3 rounded-3xl">
            <div>
              <h1 className="text-2xl font-bold">Tasks List 📝</h1>
            </div>

            <div className="mt-3 p-2 flex gap-3 text-xl flex-col">
              {data.map((ele) => (
                <div key={ele.id} className="flex items-center justify-between">
                  <div>
                    <article className="checkbox-container">
                      <label className="checkbox">
                        <input id="check" onChange={() => checking(ele.id)} type="checkbox" checked={ele.isChecked} />
                      </label>
                    </article>
                  </div>
                  <div className="flex-grow text-start">
                    <h2 className={ele.isChecked ? 'line-through' : ''}>{ele.todo}</h2>
                  </div>
                  <div>
                    <button aria-label="Delete item" onClick={() => deleTodo(ele.id)} className="delete-button">
                      <svg className="trash-svg" viewBox="0 -10 64 74" xmlns="http://www.w3.org/2000/svg">
                        <g id="trash-can">
                          <rect x="16" y="24" width="32" height="30" rx="3" ry="3" fill="#e74c3c"></rect>
                          <g transformOrigin="12 18" id="lid-group">
                            <rect x="12" y="12" width="40" height="6" rx="2" ry="2" fill="#c0392b"></rect>
                            <rect x="26" y="8" width="12" height="4" rx="2" ry="2" fill="#c0392b"></rect>
                          </g>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <button className="editBtn" onClick={() => updateData(ele.id)}>
                      <svg height="1em" viewBox="0 0 512 512">
                        <path
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
