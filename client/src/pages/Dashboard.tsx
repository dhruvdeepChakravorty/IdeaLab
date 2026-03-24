import { deleteIdea, getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea.types";
import { Button } from "@/components/ui/button";
import CreateIdeaDialog from "../components/CreateIdeaDialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, Plus, Lightbulb } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [dialogState, setDialogState] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleDelete = (ideaId: string) => {
    toast.promise(deleteIdea(ideaId), {
      loading: "Deleting idea...",
      success: () => {
        setIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
        return "Idea deleted";
      },
      error: (error) => {
        return error.message || "Something went wrong";
      },
    });
  };

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
        const allIdeas = await getAllIdeaFunction();
        setIdeas(allIdeas);
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
        setLoading(false);
      }
      return;
    };
    fetchAllIdeas();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">

     
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Your Ideas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Capture, refine, and develop your best ideas
          </p>
        </div>
        <Button size="sm" onClick={() => setDialogState(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          New Idea
        </Button>
      </div>

     
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground">
          <Spinner />
          <span className="text-sm">Loading your ideas...</span>
        </div>

      ) : ideas.length === 0 ? (
       
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-24 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Lightbulb className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">No ideas yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first idea to get started
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setDialogState(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            New Idea
          </Button>
        </div>

      ) : (
       
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="group relative rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
             
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(idea._id)}
                className="absolute right-3 top-3 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>

            
              <Link to={`/idea/${idea._id}`} className="block space-y-1">
                <p className="pr-6 text-sm font-medium text-foreground leading-snug">
                  {idea.title}
                </p>
                <p className="text-xs text-muted-foreground">View details →</p>
              </Link>
            </div>
          ))}
        </div>
      )}

      <CreateIdeaDialog
        open={dialogState}
        onOpenChange={setDialogState}
        onIdeaCreated={(newIdea) => setIdeas((prev) => [...prev, newIdea])}
      />
    </div>
  );
};

export default Dashboard;