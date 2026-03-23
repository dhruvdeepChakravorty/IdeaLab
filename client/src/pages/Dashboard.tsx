import { getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea.types";
import { Button } from "@/components/ui/button";
import CreateIdeaDialog from "../components/CreateIdeaDialog";
import { Link } from "react-router-dom";
import { toast } from "sonner";
const Dashboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [dialogState, setDialogState] = useState(false);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      try {
        const allIdeas = await getAllIdeaFunction();
        setIdeas(allIdeas);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
      return;
    };
    fetchAllIdeas();
  }, []);
  return (
    <>
      {ideas.map((idea) => (
        <Link key={idea._id} to={`/idea/${idea._id}`}>
          <div>{idea.title}</div>
        </Link>
      ))}

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
