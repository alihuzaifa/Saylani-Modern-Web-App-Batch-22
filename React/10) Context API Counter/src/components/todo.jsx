import { useState } from "react";
import "../styles/todo.css";
import { ClipLoader } from "react-spinners";
import supabase from "../supabase";
import { useEffect } from "react";

function Todo() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [todos, setTodos] = useState([]);

  const addTodo = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from("todos").insert({
        title: input,
      });
      setFetch(!fetch);
      //   false   if true set false or if false set true
      if (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const getAllTodos = async () => {
    try {
      const { data, error } = await supabase.from("todos").select();
      if (error) {
        console.error(error);
      } else {
        setTodos(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async () => {};
  const editTodo = async () => {};

  useEffect(() => {
    getAllTodos();
  }, [fetch]);

  return (
    <div className="container">
      <header>
        <h1>My Tasks ✨</h1>
        <p>Organize your day, one task at a time.</p>
      </header>

      <div className="todo-card">
        <div className="input-group">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button className="add-btn" onClick={addTodo}>
            {loading ? <ClipLoader size={16} color="#fff" /> : "+ Add Task"}
          </button>
        </div>

        <div className="task-list">
          {todos.map((item) => {
            return (
              <div className="task" key={item.id}>
                <div className="task-info">
                  <h4>{item.title}</h4>
                </div>

                <div className="task-actions">
                  <button className="edit-btn" title="Edit">
                    ✏️
                  </button>

                  <button className="delete-btn" title="Delete">
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
