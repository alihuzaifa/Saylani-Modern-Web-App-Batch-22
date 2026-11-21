import { useState } from "react";
import { useNavigate } from "react-router";
import {
  addTodo,
  deleteTodo,
  getCurrentUser,
  getTodos,
  logout,
  updateTodo,
} from "../storage";

const Todo = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [todos, setTodos] = useState(() => getTodos(user.id));
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  const refresh = () => setTodos(getTodos(user.id));

  const handleSave = () => {
    const title = input.trim();
    if (!title) return;

    if (editId === null) {
      addTodo(user.id, title);
    } else {
      updateTodo(editId, title);
      setEditId(null);
    }
    setInput("");
    refresh();
  };

  const handleEdit = (todo) => {
    setInput(todo.title);
    setEditId(todo.id);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
    if (editId === id) {
      setEditId(null);
      setInput("");
    }
    refresh();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="todo-page">
      <header className="top">
        <h1>{user.name}'s Todos</h1>
        <button className="danger" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="card">
        <div className="add">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button onClick={handleSave}>
            {editId === null ? "Add" : "Update"}
          </button>
        </div>

        {todos.length === 0 && <p className="empty">No todos yet</p>}

        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <div className="actions">
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
