import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, GitBranch } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const features = [
  {
    icon: Lightbulb,
    title: "Capture",
    description:
      "Quickly log your ideas before they slip away. Give them a title and start building.",
  },
  {
    icon: Sparkles,
    title: "Refine",
    description:
      "Describe your idea in detail and let AI surface strengths, weaknesses, and blind spots.",
  },
  {
    icon: GitBranch,
    title: "Iterate",
    description:
      "Generate multiple versions as your idea evolves. Navigate back and forth through your thinking.",
  },
];

const Home = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-muted-foreground">
        <Spinner />
        <span className="text-sm">Loading...</span>
      </div>
    );
  }
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Turn rough ideas into refined ones
        </h1>
        <p className="mt-4 max-w-md text-base text-muted-foreground">
          IdeaLab uses AI to help you think deeper — surfacing strengths,
          weaknesses, and next steps for any idea you have.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline">
              Log In
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-24 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6 space-y-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-4 w-4 text-foreground" />
            </div>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
