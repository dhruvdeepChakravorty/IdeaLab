import VersionViewer from "@/components/VersionViewer";
import { getAllIdeaVersion, getIdeaById } from "@/services/ideaServices";
import type { Version } from "@/types/version.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
    <>
      <h1>{title} </h1>
      <VersionViewer
        versions={versions}
        onVersionCreated={(newVersion) =>
          setVersions((prev) => [...prev, newVersion])
        }
      />
    </>
  );
};

export default IdeaDetail;
