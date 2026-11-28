import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../storage";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter email and password");
      return;
    }

    const message = login(email.trim().toLowerCase(), password);
    if (message) {
      setError(message);
      return;
    }
    navigate("/");
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p className="switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
