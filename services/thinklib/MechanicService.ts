import { thinklibApi } from "@/config/thinklibApiConfig";
import {
  IMechanic,
  IMechanicListResponse,
  IMechanicCreatePayload,
  IMechanicUpdatePayload,
} from "@/interfaces/thinklib/IMechanic";

export const getMechanics = async (params: {
  pageNumber: number;
  pageSize: number;
  categoryNames?: string[];
  typeNames?: string[];
}): Promise<IMechanicListResponse> => {
  const qs = new URLSearchParams({
    PageNumber: String(params.pageNumber),
    PageSize: String(params.pageSize),
    View: "Full",
  });
  params.categoryNames?.forEach((n) => qs.append("CategoryNames", n));
  params.typeNames?.forEach((n) => qs.append("TypeNames", n));

  const response = await thinklibApi.get<IMechanicListResponse>(`/api/mechanics?${qs}`);
  return response.data;
};

export const getMechanicById = async (id: string): Promise<IMechanic> => {
  const response = await thinklibApi.get<IMechanic>(`/api/mechanics/${id}?View=Full`);
  return response.data;
};

export const createMechanic = async (
  payload: IMechanicCreatePayload
): Promise<{ id: string }> => {
  const response = await thinklibApi.post<{ id: string }>("/api/mechanics", payload);
  return response.data;
};

export const updateMechanic = async (
  id: string,
  payload: IMechanicUpdatePayload
): Promise<void> => {
  const form = new FormData();
  form.append("Name", payload.name);
  form.append("PresentationText", payload.presentationText);
  form.append("Description", payload.description);
  form.append("VideoUrl", payload.videoUrl);
  form.append("UnityVersion", payload.unityVersion);
  form.append("CategoryId", payload.categoryId);
  form.append("TypeId", payload.typeId);

  if (payload.imageFile) form.append("Image", payload.imageFile);
  if (payload.gifFile) form.append("Gif", payload.gifFile);

  payload.sourceFiles.forEach((sf, i) => {
    form.append(`SourceFiles[${i}].FileName`, sf.fileName);
    form.append(`SourceFiles[${i}].FileContent`, sf.fileContent);
  });

  (payload.files ?? []).forEach((f, i) => {
    form.append(`Files[${i}].DownloadLink`, f.downloadLink);
    form.append(`Files[${i}].FileId`, f.fileId);
    form.append(`Files[${i}].FileType`, f.fileType);
  });

  await thinklibApi.put(`/api/mechanics/${id}`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
