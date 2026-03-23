import type { Version } from "@/types/version.types";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "./ui/spinner";

interface VerisonViewerProps {
  versions: Version[];
  onVersionCreated: (version: Version) => void;
}

const VersionViewer = ({ versions, onVersionCreated }: VerisonViewerProps) => {
  const [explanation, setExplanation] = useState("");
  const [pending, setPending] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(versions.length - 1);
  
  return (
    <>
      <Button
        onClick={() => setCurrentIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
      >
        {" "}
        <ArrowLeft />{" "}
      </Button>
      {currentIndex === versions.length ? (
        <>
          <div>Enter Your Explanation to diagnose your idea further</div>
          <Field>
            <FieldLabel htmlFor="textarea-message">Explanation</FieldLabel>
            <FieldDescription>Enter your explanation below.</FieldDescription>
            <Textarea
              id="textarea-message"
              placeholder="Type your explanation here."
              value={explanation}
              onChange={(e)=>(setExplanation(e.target.value))}
            />
          </Field>
          {pending ? (
          <Button variant="secondary" disabled>
            Diagnosing...
            <Spinner data-icon="inline-start" />
          </Button>
        ) : (
          <Button type="submit" variant="outline">
            Generate Version
          </Button>
        )}
        </>
      ) : (
        <>
          <div>
            <p>{versions[currentIndex].aiOutput.refinedIdea}</p>
            <div>
              {versions[currentIndex].aiOutput.strengths.map(
                (strength, index) => (
                  <p key={index}>{strength}</p>
                ),
              )}
            </div>
            <div>
              {versions[currentIndex].aiOutput.weaknesses.map(
                (weakness, index) => (
                  <p key={index}>{weakness}</p>
                ),
              )}
            </div>
            <div>
              {versions[currentIndex].aiOutput.nextSteps.map(
                (nextStep, index) => (
                  <p key={index}>{nextStep}</p>
                ),
              )}
            </div>
            <div>
              {versions[currentIndex].aiOutput.questions.map(
                (question, index) => (
                  <p key={index}>{question}</p>
                ),
              )}
            </div>
          </div>
          <Field>
            <FieldLabel htmlFor="textarea-message">Explanation</FieldLabel>
            <Textarea
              id="textarea-message"
              value={versions[currentIndex].explanation}
              disabled
            />
          </Field>
          
        </>
      )}

      <Button
        onClick={() => setCurrentIndex(currentIndex + 1)}
        disabled={currentIndex === versions.length}
      >
        {" "}
        <ArrowRight />{" "}
      </Button>
    </>
  );
};

export default VersionViewer;
