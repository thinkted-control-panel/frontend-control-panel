import { thinklibApi } from "@/config/thinklibApiConfig";
import { IGameCategory, IGameCategoryListResponse } from "@/interfaces/thinklib/IGameCategory";

export const getCategories = async (): Promise<IGameCategoryListResponse> => {
  const response = await thinklibApi.get<IGameCategoryListResponse>("/api/game-categories");
  return response.data;
};

export const createCategory = async (name: string): Promise<{ id: string; message?: string }> => {
  const response = await thinklibApi.post("/api/game-categories", { name });
  return response.data;
};

export const updateCategory = async (id: string, name: string): Promise<IGameCategory> => {
  const response = await thinklibApi.put<IGameCategory>(`/api/game-categories/${id}`, { name });
  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await thinklibApi.delete(`/api/game-categories/${id}`);
};
