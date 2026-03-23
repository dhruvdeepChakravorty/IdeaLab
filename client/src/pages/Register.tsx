import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema } from "@/types/register.types";
import { toast } from "sonner";
import { registerFuntion } from "@/services/authServices";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";

const Register = () => {
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.SubmitEvent) => {
    setPending(true);
    try {
      e.preventDefault();
      const validation = registerSchema.safeParse({
        username,
        email,
        password,
      });
      if (!validation.success) {
        const issues = validation.error.issues;
        const usernameError = issues.find(
          (issue) => issue.path[0] === "username",
        )?.message;

        const emailError = issues.find(
          (issue) => issue.path[0] === "email",
        )?.message;

        const passwordError = issues.find(
          (issue) => issue.path[0] === "password",
        )?.message;

        setPending(false);
        toast.error(
          usernameError || emailError || passwordError || "Invalid input",
        );
        return;
      }

      toast.promise<{ user: any }>(registerFuntion(username, email, password), {
        loading: "Signing in...",
        success: (result) => {
          login(result.user);
          navigate("/dashboard");
          setPending(false);
          return "Signed Up";
        },
        error: (error: any) => {
          setPending(false);
          setPassword("");
          return error.message || "Sign up failed";
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field>
          <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
          <Input
            id="input-field-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
          <Input
            id="input-field-email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FieldDescription>Enter your Email for your account</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
          <Input
            id="input-field-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
          <FieldDescription>
            Enter a password for your account (min 4 char).
          </FieldDescription>
        </Field>

        {pending ? (
          <Button variant="secondary" disabled>
            Signing In
            <Spinner data-icon="inline-start" />
          </Button>
        ) : (
          <Button type="submit" variant="outline">
            Sign Up
          </Button>
        )}
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </>
  );
};
export default Register;
