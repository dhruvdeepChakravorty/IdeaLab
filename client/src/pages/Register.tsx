import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { registerSchema } from "@/types/register.types";
import { toast } from "sonner";
import { registerFuntion } from "@/services/authServices";
import { useAuth } from "@/context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [pending, setPending] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setPending(true);
    try {
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Start refining your ideas with IdeaLab
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="input-field-username"
              className="text-sm font-medium text-foreground"
            >
              Username
            </FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-9 text-sm"
            />
          </Field>

          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="input-field-email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </FieldLabel>
            <Input
              id="input-field-email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Create a password (min 4 chars)"
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
              Signing up <Spinner data-icon="inline-start" className="ml-2" />
            </Button>
          ) : (
            <Button type="submit" className="w-full h-9 text-sm">
              Sign Up
            </Button>
          )}
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
