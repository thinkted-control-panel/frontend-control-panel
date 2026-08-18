import { thinklibApi } from "@/config/thinklibApiConfig";
import { IMechanicType, IMechanicTypeListResponse } from "@/interfaces/thinklib/IMechanicType";

export const getTypesByCategory = async (categoryId: string): Promise<IMechanicTypeListResponse> => {
  const response = await thinklibApi.get<IMechanicTypeListResponse>(
    `/api/game-categories/${categoryId}/mechanic-types`
  );
  return response.data;
};

export const createType = async (
  categoryId: string,
  name: string
): Promise<{ id: string; message?: string }> => {
  const response = await thinklibApi.post(
    `/api/game-categories/${categoryId}/mechanic-types`,
    { name }
  );
  return response.data;
};

export const updateType = async (
  categoryId: string,
  typeId: string,
  name: string
): Promise<IMechanicType> => {
  const response = await thinklibApi.put<IMechanicType>(
    `/api/game-categories/${categoryId}/mechanic-types/${typeId}`,
    { name }
  );
  return response.data;
};

export const deleteType = async (categoryId: string, typeId: string): Promise<void> => {
  await thinklibApi.delete(`/api/game-categories/${categoryId}/mechanic-types/${typeId}`);
};
