export interface AiOutput {
  refinedIdea: string;
  strengths: string[];
  weaknesses: string[];
  nextSteps: string[];
  questions: string[];
}

export interface Version {
  _id:string,
  ideaId: string;
  explanation: string;
  versionNum: number;
  aiOutput: AiOutput;
}
