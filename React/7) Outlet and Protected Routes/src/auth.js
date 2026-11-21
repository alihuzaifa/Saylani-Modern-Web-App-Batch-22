// Dummy login: asli project mein yahan Supabase / API aayegi
const KEY = "user";

export const getUser = () => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : null;
};

export const login = (email) => {
  localStorage.setItem(KEY, JSON.stringify({ email }));
};

export const logout = () => {
  localStorage.removeItem(KEY);
};
