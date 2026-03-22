import { getAllIdeaVersion, getIdeaById } from "@/services/ideaServices";
import type { Idea } from "@/types/idea.types";
import type { Version } from "@/types/version.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IdeaDetail = () => {
  const { id } = useParams();
  const [version, setVersion] = useState<Version[]>([]);
  const [title, setTitle] = useState<Idea>();
  if (!id) return null;
  useEffect(() => {
    const getAllVersionAndIdea = async () => {
      const [allVersions, idea] = await Promise.all([
        getAllIdeaVersion(id),
        getIdeaById(id),
      ]);
      setVersion(allVersions);
      setTitle(idea.title);
    };
    getAllVersionAndIdea();
  }, []);
  return (
    <>
      <h1>Idea Detail Page </h1>
    </>
  );
};

export default IdeaDetail;
