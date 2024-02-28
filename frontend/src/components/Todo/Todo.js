import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = ({todo,handleDelete,setTodo,setEditingObject,handleMarkTodoCompleted}) => {
  return (
    <div
             
                  className="flex justify-between bg-slate-100 rounded-[5px] p-[20px]"
                >
                  <div
                    className="flex gap-2 cursor-pointer "
                    onClick={() => handleMarkTodoCompleted(todo._id)}
                  >
                    <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      className="cursor-pointer"
                    />
                    <span className="text-[#000]  font-[700]">{todo.todo}</span>
                  </div>

                  <div className="flex gap-[20px] text-[#000] capitalize font-[700]">
                    <span
                      onClick={() => handleDelete(todo._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete className='text-[#f54646] text-[24px] font-[600]' />

                    </span>
                    <span
                      onClick={() => {
                        setTodo(todo.todo);
                        setEditingObject(todo);
                      }}
                      className="cursor-pointer"
                    >
                    <FaRegEdit className='text-[#3a58bb] text-[24px] font-[600]'/>

                    </span>
                  </div>
                </div>
  )
}

export default Todo