import api from "./api";

export const createIdeaFunction = async (title: string) => {
  try {
    const result = await api.post("/ideas/", { title });
    return result.data.idea;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something Went Wrong");
  }
};

export const getAllIdeaFunction = async () => {
  try {
    const result = await api.get("/ideas/");
    return result.data.allIdeas;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something Went Wrong");
  }
};

export const getAllIdeaVersion = async (ideaId: string) => {
  try {
    const result = await api.get(`/ideas/${ideaId}/versions`);
    return result.data.allVersions;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getIdeaById = async(ideaId: string) => {
  try {
    const result = await api.get(`/ideas/${ideaId}`);
    return result.data.foundIdea;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
