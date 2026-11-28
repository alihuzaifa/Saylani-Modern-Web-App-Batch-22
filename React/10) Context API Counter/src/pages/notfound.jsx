import { useNavigate, Link } from "react-router";

const NotFound = () => {
  //   const navigate = useNavigate();

  return (
    <>
      <h1>404 - Page Not Found</h1>

      <Link to="/">
        <button>Go Back</button>
      </Link>
      {/* <button onClick={() => {
        navigate(-1);
        // navigate('/')
      }}>Go Back</button> */}
    </>
  );
};

export default NotFound;
