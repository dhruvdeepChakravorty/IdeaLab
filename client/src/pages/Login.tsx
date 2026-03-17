import { useState } from "react";
import { loginFuntion } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const result = await loginFuntion(identifier, password);
      login(result.token, result.user);
      navigate("/dashboard");
     
    } catch (error: any) {
      setError(error.message);
    }finally{
       setPending(false);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => setPending(true)}
        disabled={pending}
      >
        {pending ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};
export default Login;
