import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import AddTodo from "../../components/AddTodo/AddTodo";
import {
  createTodo,
  deleteTodo,
  getTodos,
  markTodoCompleted,
  updateTodo,
} from "../../services/todos";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [EditingObject, setEditingObject]=useState({})
  const fetchAllTodos = async () => {
    try {
      const res = await getTodos("todo/get-todos");
      if (res && res.data && res.data.success) {
        setTodos(res.data.todos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const apiCall = EditingObject && EditingObject._id
        ? updateTodo(`todo/update-todo/${EditingObject._id}`, { todo })
        : createTodo("todo/add-todo", { todo });
      
      const res = await apiCall;
      
      if (res && res.data && res.data.success) {
        fetchAllTodos();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setTodo("");
      setEditingObject({});
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const res = await deleteTodo(`todo/delete-todo/${todoId}`);
      if (res && res.data && res.data.success) {
        fetchAllTodos();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleMarkTodoCompleted = async (todoId) => {
    try {
      const res = await markTodoCompleted(`todo/mark-completed/${todoId}`);
      if (res && res.data && res.data.success) {
        fetchAllTodos();
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  return (
    <div className="min-h-[100vh] px-2 flex pt-[50px] justify-center">
      <div className="w-[500px] mx-auto">
        <AddTodo handleSubmit={handleSubmit} setTodo={setTodo} todo={todo} isLoading={isLoading} />
        {todos.length > 0 && (
          <div className="flex flex-col gap-[20px] mt-[20px] bg-blue-300 p-[20px] rounded-[5px]">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                handleDelete={handleDelete}
                setTodo={setTodo}
                setEditingObject={setEditingObject}
                handleMarkTodoCompleted={handleMarkTodoCompleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
