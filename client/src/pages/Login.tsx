import { useState } from "react";
import { loginFuntion } from "../services/authServices";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { loginSchema } from "@/types/login.types";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const validation = loginSchema.safeParse({ identifier, password });
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

      toast.promise<{ user: any }>(loginFuntion(identifier, password), {
        loading: "Logging in...",
        success: (result) => {
          login(result.user);
          navigate("/dashboard");
          setPending(false);
          return "Logged in";
        },
        error: (error: any) => {
          setPending(false);
          return error.message || "Log in failed";
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setPassword("");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your IdeaLab account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="input-field-identifier"
              className="text-sm font-medium text-foreground"
            >
              Username / Email
            </FieldLabel>
            <Input
              id="input-field-identifier"
              type="text"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="h-9 text-sm"
            />
          </Field>

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="input-field-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </FieldLabel>

            <div className="relative">
              <Input
                id="input-field-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9 pr-9 text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Field>

        
          {pending ? (
            <Button variant="secondary" disabled className="w-full h-9 text-sm">
              Logging in <Spinner data-icon="inline-start" className="ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="w-full h-9 text-sm">
              Log In
            </Button>
          )}
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
