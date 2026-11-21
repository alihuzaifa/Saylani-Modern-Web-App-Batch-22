import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/users", label: "Users" },
  { to: "/settings", label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">My App</h2>
      <nav>
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
