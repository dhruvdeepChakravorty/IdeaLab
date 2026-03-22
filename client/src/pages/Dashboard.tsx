import { getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea.types";
import { Button } from "@/components/ui/button";
import CreateIdeaDialog from "../components/CreateIdeaDialog";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [dialogState, setDialogState] = useState(false);

  useEffect(() => {
    const fetchAllIdeas = async () => {
      const allIdeas = await getAllIdeaFunction();
      setIdeas(allIdeas);
      return;
    };
    fetchAllIdeas();
  }, []);
  return (
    <>
      {ideas.map((idea) => (
        <Link to={`/idea/${idea._id}`}>
        <div key={idea._id}>
          <div>{idea.title}</div>
        </div>
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
