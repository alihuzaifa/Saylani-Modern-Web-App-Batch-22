import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      setUsers(response.data);
      
    } catch (error) {}
  };

  console.log(users);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <h1>Users List</h1>
      <ul>
        {users.map((item,index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Users;
