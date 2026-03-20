import api from "./api";

export const createIdeaFunction = async (title: string) => {
  try {
    const result = await api.post("/ideas/", { title });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something Went Wrong");
  }
};

export const getAllIdeaFunction = async () => {
  try {
    const result = await api.get("/ideas/",);
    return result.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something Went Wrong");
  }
};
