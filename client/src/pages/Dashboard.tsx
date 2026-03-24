import { deleteIdea, getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea.types";
import { Button } from "@/components/ui/button";
import CreateIdeaDialog from "../components/CreateIdeaDialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const Dashboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [dialogState, setDialogState] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleDelete = (ideaId: string) => {
    toast.promise(deleteIdea(ideaId), {
      loading: "deleting idea...",
      success: () => {
        setIdeas((prev) => prev.filter((idea) => idea._id !== ideaId));
        return "Idea deleted";
      },
      error: (error) => {
        return error.message || "something went wrong";
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
    <>
      {loading ? (
        <div>
          <Spinner />
          <div>Loading...</div>
        </div>
      ) : ideas.length === 0 ? (
        <div>No ideas yet</div>
      ) : (
        ideas.map((idea) => (
          <div key={idea._id}>
            <Link to={`/idea/${idea._id}`}>
              <div>{idea.title}</div>
            </Link>
            <Button onClick={() => handleDelete(idea._id)}>
              <Trash2 />
            </Button>
          </div>
        ))
      )}
      <Button variant="outline" onClick={() => setDialogState(true)}>
        Create Idea +
      </Button>
      <CreateIdeaDialog
        open={dialogState}
        onOpenChange={setDialogState}
        onIdeaCreated={(newIdea) => setIdeas((prev) => [...prev, newIdea])}
      />
    </>
  );
};
export default Dashboard;
