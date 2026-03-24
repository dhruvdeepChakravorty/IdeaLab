import type { Version } from "@/types/version.types";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";
import { createVersion } from "@/services/ideaServices";
import { useParams } from "react-router-dom";

interface VerisonViewerProps {
  versions: Version[];
  onVersionCreated: (version: Version) => void;
}

const VersionViewer = ({ versions, onVersionCreated }: VerisonViewerProps) => {
  const { id } = useParams();

  const [explanation, setExplanation] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    versions.length === 0 ? 0 : versions.length - 1,
  );

  if (!id) return null;

  const handleSubmit = async () => {
    setPending(true);
    if (!explanation.trim()) {
      toast.error("Please enter explanation");
      setPending(false);
      return;
    }
    toast.promise<Version>(createVersion(id, explanation), {
      loading: "Processing...",
      success: (result) => {
        onVersionCreated(result);
        setExplanation("");
        setCurrentIndex(versions.length);
        setPending(false);
        return "Version Generated";
      },
      error: (error: any) => {
        setPending(false);
        return error.message || "Something went wrong";
      },
    });
  };

  const handleCopy = () => {
    const v = versions[currentIndex];
    const text = `Refined Idea:\n${v.aiOutput.refinedIdea}\n\nStrengths:\n${v.aiOutput.strengths.map((s) => `+ ${s}`).join("\n")}\n\nWeaknesses:\n${v.aiOutput.weaknesses.map((s) => `- ${s}`).join("\n")}\n\nNext Steps:\n${v.aiOutput.nextSteps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nQuestions to Consider:\n${v.aiOutput.questions.map((s) => `? ${s}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isNewVersion =
    currentIndex === versions.length || versions.length === 0;
  const totalVersions = versions.length;

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center justify-between shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <span className="text-sm text-muted-foreground">
          {isNewVersion
            ? totalVersions === 0
              ? "No versions yet"
              : "New version"
            : `Version ${currentIndex + 1} of ${totalVersions}`}
        </span>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex === versions.length}
          className="h-8 w-8"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {isNewVersion ? (
          <div className="space-y-4">
            <p className="text-base text-muted-foreground">
              Describe your idea in detail — the more context you give, the
              better the refinement.
            </p>
            <Field className="space-y-1.5">
              <FieldLabel
                htmlFor="textarea-message"
                className="text-base font-medium text-foreground"
              >
                Explanation
              </FieldLabel>
              <Textarea
                id="textarea-message"
                placeholder="What's your idea? Walk through the problem, your solution, and any context you have..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                className="min-h-36 resize-none text-base"
              />
            </Field>
            {pending ? (
              <Button variant="secondary" disabled className="w-full h-10">
                Diagnosing...{" "}
                <Spinner data-icon="inline-start" className="ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full h-10"
                onClick={handleSubmit}
              >
                Generate Version
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-5 pb-4">
            <div className="rounded-xl border border-border bg-card p-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Refined Idea
              </p>
              <p className="text-base text-foreground leading-relaxed">
                {versions[currentIndex].aiOutput.refinedIdea}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                Strengths
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {versions[currentIndex].aiOutput.strengths.map(
                  (strength, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-4 border-l-4 border-l-green-500"
                    >
                      <p className="text-base text-foreground">{strength}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                Weaknesses
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {versions[currentIndex].aiOutput.weaknesses.map(
                  (weakness, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-4 border-l-4 border-l-red-500"
                    >
                      <p className="text-base text-foreground">{weakness}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Next Steps
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {versions[currentIndex].aiOutput.nextSteps.map(
                  (nextStep, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-4 border-l-4 border-l-blue-500"
                    >
                      <p className="text-base text-foreground">
                        <span className="font-medium text-blue-500 mr-1.5">
                          {index + 1}.
                        </span>
                        {nextStep}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Questions to Consider
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {versions[currentIndex].aiOutput.questions.map(
                  (question, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-border bg-card p-4 border-l-4 border-l-amber-500"
                    >
                      <p className="text-base text-foreground">{question}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="w-full h-9"
            >
              {copied ? (
                <>
                  <Check className="mr-1.5 h-4 w-4 text-green-500" /> Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-4 w-4" /> Copy Output
                </>
              )}
            </Button>

            <Field className="space-y-1.5">
              <FieldLabel
                htmlFor="textarea-message"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Your Explanation
              </FieldLabel>
              <Textarea
                id="textarea-message"
                value={versions[currentIndex].explanation}
                disabled
                className="resize-none text-base text-foreground disabled:opacity-100 min-h-24"
              />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionViewer;



