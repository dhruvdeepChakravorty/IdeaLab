import { getAllIdeaFunction } from "@/services/ideaServices";
import { useEffect, useState } from "react";
import type { Idea } from "@/types/idea.types";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateIdeaDialog from "@/components/createIdeaDialog";
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
        <div key={idea._id}>
          <div>{idea.title}</div>
        </div>
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
