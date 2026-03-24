import api from "./api";

export const loginFuntion = async (identifier: string, password: string) => {
  try {
    const result = await api.post("/auth/login", { identifier, password });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const registerFuntion = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const result = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return result.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getMe = async () => {
  try {
    const result = await api.get("/auth/me");
    return result.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const logutFuntion = async () => {
  try {
    const result = await api.post("/auth/logout");
    return result.data.message;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
