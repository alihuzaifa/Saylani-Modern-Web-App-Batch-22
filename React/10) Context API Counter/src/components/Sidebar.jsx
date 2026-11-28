import '../styles/sidebar.css';
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>MyDashboard</h2>
      </div>

      <nav className="sidebar-nav">
        <a href="/" className="nav-link active">
          <span>🏠</span> Dashboard
        </a>

        <a href="/users" className="nav-link">
          <span>👥</span> Users
        </a>

        <a href="/analytics" className="nav-link">
          <span>📊</span> Analytics
        </a>

        <a href="/messages" className="nav-link">
          <span>💬</span> Messages
        </a>

        <a href="/settings" className="nav-link">
          <span>⚙️</span> Settings
        </a>
      </nav>

      <div className="sidebar-footer">
        <a href="/logout" className="nav-link">
          <span>🚪</span> Logout
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
