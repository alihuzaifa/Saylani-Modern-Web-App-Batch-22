import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import supabase from "../supabase";

const Todo = () => {
  const user = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getTodos = async () => {
    // user_id se filter: sirf is user ke todos aate hain
    const { data, error } = await supabase
      .from("user_todos")
      .select()
      .eq("user_id", user.id)
      .order("id");

    if (error) {
      setError(error.message);
    } else {
      setTodos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleSave = async () => {
    const text = input.trim();
    if (!text) return;

    setError("");
    const request =
      editId === null
        ? supabase.from("user_todos").insert({ text, user_id: user.id })
        : supabase.from("user_todos").update({ text }).eq("id", editId);

    const { error } = await request;
    if (error) {
      setError(error.message);
      return;
    }

    setInput("");
    setEditId(null);
    getTodos();
  };

  const handleEdit = (todo) => {
    setInput(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = async (id) => {
    setError("");
    const { error } = await supabase.from("user_todos").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }

    if (editId === id) {
      setEditId(null);
      setInput("");
    }
    getTodos();
  };

  const handleLogout = async () => {
    // logout hone par ProtectedRoute khud login page par bhej deta hai
    await supabase.auth.signOut();
  };

  return (
    <div className="todo-page">
      <header className="top">
        <h1>{user.user_metadata?.name || user.email}'s Todos</h1>
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

        {error && <p className="error">{error}</p>}
        {loading && <p className="empty">Loading...</p>}
        {!loading && todos.length === 0 && (
          <p className="empty">No todos yet</p>
        )}

        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.text}</span>
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
