export interface AiOutput {
  refinedIdea: string;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  questions: string[];
}

export interface Version {
  ideaId: string;
  explantion: string;
  versionNum: Number;
  aiOutput: AiOutput;
}
