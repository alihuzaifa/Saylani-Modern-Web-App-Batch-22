import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import "../styles/todo.css";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    const text = todo.trim();
    if (!text) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a task",
        icon: "warning",
      });
      return;
    }

    if (editId === null) {
      setList([...list, text]);
    } else {
      setList(list.map((item, index) => (index === editId ? text : item)));
      setEditId(null);
    }

    setTodo("");
    Swal.fire({
      title: "Success!",
      text: editId === null ? "Todo has been added" : "Todo has been updated",
      icon: "success",
    });
  };

  const deleteTodo = (index) => {
    setList(list.filter((_, i) => i !== index));
    if (editId === index) {
      setEditId(null);
      setTodo("");
    }
    Swal.fire({
      title: "Deleted!",
      text: "Todo has been deleted",
      icon: "error",
    });
  };

  const editTodo = (index, data) => {
    setTodo(data);
    setEditId(index);
  };

  return (
    <section className="box todo">
      <h1>Todo Application</h1>

      <div className="todo-form">
        <input
          type="text"
          value={todo}
          placeholder="Enter your task"
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>
          {editId === null ? "Add" : "Update"} Todo
        </button>
      </div>

      {list.length === 0 && <p className="empty">No todos yet</p>}

      <ul className="todo-list">
        {list.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <div className="actions">
              <button onClick={() => editTodo(index, item)}>Edit</button>
              <button className="danger" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Todo;
