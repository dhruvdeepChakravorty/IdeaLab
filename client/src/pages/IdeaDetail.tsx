import VersionViewer from "@/components/VersionViewer";
import { getAllIdeaVersion, getIdeaById } from "@/services/ideaServices";
import type { Version } from "@/types/version.types";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";

const IdeaDetail = () => {
  const { id } = useParams();

  const [versions, setVersions] = useState<Version[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const getAllVersionAndIdea = async () => {
      if (!id) return null;
      try {
        const [allVersions, idea] = await Promise.all([
          getAllIdeaVersion(id),
          getIdeaById(id),
        ]);
        setVersions(allVersions);
        setTitle(idea.title);
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    };
    getAllVersionAndIdea();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        to="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to ideas
      </Link>

      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>

      <VersionViewer
        versions={versions}
        onVersionCreated={(newVersion) =>
          setVersions((prev) => [...prev, newVersion])
        }
      />
    </div>
  );
};

export default IdeaDetail;