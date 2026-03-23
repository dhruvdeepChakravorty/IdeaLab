import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>IdeaLab</h1>
      {isAuthenticated ? (
        <div>
          <Link to={"/dashboard"}>
            <Button>Ideas</Button>
          </Link>
          <Button variant={"destructive"} onClick={logout}>
            {" "}
            Logout{" "}
          </Button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link to={"/register"}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
