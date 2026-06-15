import { api } from "@/config/apiConfig";
import { IUser } from "@/interfaces/IUser";
import { IUpdateUser } from "@/interfaces/IUpdateUser";

export const listUsers = async (): Promise<IUser[]> => {
  try {
    const response = await api.get<IUser[]>("/api/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id: string): Promise<IUser> => {
  try {
    const response = await api.get<IUser>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userData: IUpdateUser,
): Promise<IUser> => {
  try {
    const response = await api.put<IUser>(`/api/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
