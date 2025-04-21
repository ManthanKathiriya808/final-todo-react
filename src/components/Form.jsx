import React from 'react'

const Form = ({todo,setTodo,editId,handleSubmit}) => {
  return (
    <div>
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
  )
}

export default Form
