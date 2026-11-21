import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>404 - Page Not Found</h1>
        <Link to="/">
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
