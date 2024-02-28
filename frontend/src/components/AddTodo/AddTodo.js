import React from 'react'

const AddTodo = ({handleSubmit, todo,isLoading, setTodo}) => {
  return (
    <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={todo}
            className="h-[40px] px-[10px] w-[100%]"
            onChange={(e) => setTodo(e.target.value)}
          />
          {/* <button className='bg-['>add</button> */}
          <button
            type="submit"
            disabled={!todo || isLoading}
            className="bg-blue-300 px-[20px] font-[600] text-[#000] py-2"
          >
            {
                isLoading?"Adding":"Add"
            }
            
          </button>
        </form>
  )
}

export default AddTodo