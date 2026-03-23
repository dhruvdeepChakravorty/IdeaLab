import type { Idea } from "@/types/idea.types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { createIdeaFunction } from "@/services/ideaServices";
import { Spinner } from "./ui/spinner";

interface CreateIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIdeaCreated: (idea: Idea) => void;
}

const CreateIdeaDialog = ({
  open,
  onOpenChange,
  onIdeaCreated,
}: CreateIdeaDialogProps) => {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setPending(true);
    if (!title.trim()) {
      toast.error("Please Add Title");
      setPending(false);
      return;
    }
    toast.promise<Idea>(createIdeaFunction(title), {
      loading: "Creating Your Idea",
      success: (result) => {
        onIdeaCreated(result);
        onOpenChange(false);
        setTitle("");
        setPending(false);
        return "Idea Created";
      },
      error: (error: any) => {
        setPending(false);
        return error.message || "Something went Wrong";
      },
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create your Idea</DialogTitle>
              <DialogDescription>
                Write down your own idea to refine it better
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Title</Label>
                <Input
                  id="name-1"
                  name="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              {pending ? (
                <Button variant="secondary" disabled>
                  Creating Idea...
                  <Spinner data-icon="inline-start" />
                </Button>
              ) : (
                <Button type="submit" variant="outline">
                  Create
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateIdeaDialog;
