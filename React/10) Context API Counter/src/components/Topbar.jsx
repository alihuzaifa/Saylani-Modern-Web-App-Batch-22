import '../styles/topbar.css';
const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Dashboard</h2>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">🔔</button>

        <div className="profile">
          <img src="https://i.pravatar.cc/150?img=12" alt="Profile" />

          <div className="profile-info">
            <h4>John Doe</h4>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
