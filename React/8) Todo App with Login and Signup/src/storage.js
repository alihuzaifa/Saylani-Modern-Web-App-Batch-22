// Poora data browser ki localStorage mein hai (koi backend nahi).
// "users"  -> saare registered users
// "todos"  -> saare todos, har todo par userId
// "userId" -> abhi login user ki id

const read = (key) => JSON.parse(localStorage.getItem(key) || "[]");
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

/* ---------- Auth ---------- */

export const signup = (name, email, password) => {
  const users = read("users");
  const exists = users.some((u) => u.email === email);
  if (exists) {
    return "This email is already registered";
  }

  const user = { id: Date.now().toString(), name, email, password };
  write("users", [...users, user]);
  localStorage.setItem("userId", user.id);
  return null;
};

export const login = (email, password) => {
  const user = read("users").find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) {
    return "Wrong email or password";
  }

  localStorage.setItem("userId", user.id);
  return null;
};

export const logout = () => {
  localStorage.removeItem("userId");
};

// localStorage ki id se user dhoondta hai, na mile to null
export const getCurrentUser = () => {
  const id = localStorage.getItem("userId");
  if (!id) return null;
  return read("users").find((u) => u.id === id) || null;
};

/* ---------- Todos (sirf us user ke) ---------- */

export const getTodos = (userId) => {
  return read("todos").filter((t) => t.userId === userId);
};

export const addTodo = (userId, title) => {
  const todo = { id: Date.now().toString(), userId, title };
  write("todos", [...read("todos"), todo]);
};

export const updateTodo = (id, title) => {
  write(
    "todos",
    read("todos").map((t) => (t.id === id ? { ...t, title } : t)),
  );
};

export const deleteTodo = (id) => {
  write(
    "todos",
    read("todos").filter((t) => t.id !== id),
  );
};
