import { getAllIdeaVersion, getIdeaById } from "@/services/ideaServices";
import type { Version } from "@/types/version.types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const IdeaDetail = () => {
  const { id } = useParams();

  const [versions, setVersions] = useState<Version[]>([]);
  const [title, setTitle] = useState<string>("");
  
  if (!id) return null;
  useEffect(() => {
    const getAllVersionAndIdea = async () => {
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
           {versions.map((version) => (
        <div key={version._id}>
          <div>{version.versionNum}</div>
          <div>
            <p>{version.aiOutput.refinedIdea}</p>
            <div>
              {version.aiOutput.strengths.map((strength, index) => (
                <p key={index}>{strength}</p>
              ))}
            </div>
            <div>
              {version.aiOutput.weaknesses.map((weakness, index) => (
                <p key={index}>{weakness}</p>
              ))}
            </div>
            <div>
              {version.aiOutput.nextSteps.map((nextStep, index) => (
                <p key={index}>{nextStep}</p>
              ))}
            </div>
            <div>
              {version.aiOutput.questions.map((question, index) => (
                <p key={index}>{question}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default IdeaDetail;
