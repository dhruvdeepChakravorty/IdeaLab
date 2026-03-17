import api from "./api";

export const loginFuntion = async (identifier: string, password: string) => {
  const result = await api.post("/auth/login", { identifier, password });
  return result.data;
};

export const registerFuntion = async (
  username: string,
  email: string,
  password: string,
) => {
  const result = await api.post("/auth/register", {
    username,
    email,
    password,
  });
  return result.data;
};
