import { useState } from "react";
import { loginFuntion } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { toast } from "sonner";
import { loginSchema } from "@/types/login.types";
import { Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.SubmitEvent) => {
    setPending(true);
    try {
      e.preventDefault();
      const validation = loginSchema.safeParse({
        identifier,
        password,
      });
      if (!validation.success) {
        const issues = validation.error.issues;

        const identifierError = issues.find(
          (issue) => issue.path[0] === "identifier",
        )?.message;
        const passwordError = issues.find(
          (issue) => issue.path[0] === "password",
        )?.message;
        setPending(false);
        toast.error(identifierError || passwordError || "Invalid input");
        return;
      }

      toast.promise<{ token: string; user: any }>(
        loginFuntion(identifier, password),
        {
          loading: "Logging in...",
          success: (result) => {
            login(result.token, result.user);
            navigate("/dashboard");
            setPending(false);
            return "Logged in";
          },
          error: (error: any) => {
            setPending(false);
            return error.message || "Log in failed";
          },
        },
      );
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setPassword("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="input-field-identifier">
            Username/Email
          </FieldLabel>
          <Input
            id="input-field-identifier"
            type="text"
            placeholder="Enter your username/email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <FieldDescription>Enter your Username or Email</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
          <Input
            id="input-field-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FieldDescription>Enter your Password</FieldDescription>
        </Field>
        {pending ? (
          <Button variant="secondary" disabled>
            Logging In
            <Spinner data-icon="inline-start" />
          </Button>
        ) : (
          <Button type="submit" variant="outline">
            Log In
          </Button>
        )}
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
export default Login;
