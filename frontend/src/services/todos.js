import API from "./globalSender"


const createTodo= ((url, data)=>API.post(url,data))
const getTodos= ((url)=>API.get(url))
const deleteTodo= ((url)=>API.delete(url))
const updateTodo= ((url, data)=>API.put(url, data))
const markTodoCompleted= ((url)=>API.put(url))

export {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    markTodoCompleted
}

