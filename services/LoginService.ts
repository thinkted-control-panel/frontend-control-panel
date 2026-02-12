import { api } from "@/config/apiConfig";
import { ILogin } from "@/interfaces/ILogin";

interface LoginResponse {
  token: string;
}

export const login = async (credentials: ILogin): Promise<string> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};
