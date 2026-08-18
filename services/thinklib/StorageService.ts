import { thinklibApi } from "@/config/thinklibApiConfig";
import { FileType, IStorageFile } from "@/interfaces/thinklib/IStorage";

export const uploadFile = async (file: File, fileType: FileType): Promise<IStorageFile> => {
  const form = new FormData();
  form.append("File", file);
  form.append("FileType", fileType);

  const response = await thinklibApi.post<IStorageFile>("/api/storage", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
