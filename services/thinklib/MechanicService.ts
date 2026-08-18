import { thinklibApi } from "@/config/thinklibApiConfig";
import {
  ApprovalStatus,
  IMechanic,
  IMechanicListResponse,
  IMechanicCreatePayload,
  IMechanicUpdatePayload,
  IMechanicEditRequest,
  IMechanicEditRequestListResponse,
} from "@/interfaces/thinklib/IMechanic";

export const getMechanics = async (params: {
  pageNumber: number;
  pageSize: number;
  categoryNames?: string[];
  typeNames?: string[];
  status?: ApprovalStatus;
}): Promise<IMechanicListResponse> => {
  const qs = new URLSearchParams({
    PageNumber: String(params.pageNumber),
    PageSize: String(params.pageSize),
  });
  params.categoryNames?.forEach((n) => qs.append("CategoryNames", n));
  params.typeNames?.forEach((n) => qs.append("TypeNames", n));
  if (params.status) qs.append("Status", params.status);

  const response = await thinklibApi.get<IMechanicListResponse>(`/api/mechanics?${qs}`);
  return response.data;
};

export const getMechanicById = async (id: string, status?: ApprovalStatus): Promise<IMechanic> => {
  const qs = new URLSearchParams({ View: "Full" });
  if (status) qs.append("Status", status);
  const response = await thinklibApi.get<IMechanic>(`/api/mechanics/${id}?${qs}`);
  return response.data;
};

export const reviewMechanic = async (
  mechanicId: string,
  status: "Approved" | "Rejected",
  rejectReason?: string
): Promise<IMechanic> => {
  const response = await thinklibApi.post<IMechanic>(`/api/mechanics/${mechanicId}/review`, {
    status,
    rejectReason,
  });
  return response.data;
};

export const getMechanicEditRequests = async (params: {
  pageNumber: number;
  pageSize: number;
  status?: ApprovalStatus;
}): Promise<IMechanicEditRequestListResponse> => {
  const qs = new URLSearchParams({
    PageNumber: String(params.pageNumber),
    PageSize: String(params.pageSize),
  });
  if (params.status) qs.append("Status", params.status);

  const response = await thinklibApi.get<IMechanicEditRequestListResponse>(
    `/api/mechanics/edit-requests?${qs}`
  );
  return response.data;
};

export const reviewMechanicEditRequest = async (
  editRequestId: string,
  status: "Approved" | "Rejected",
  rejectReason?: string
): Promise<IMechanicEditRequest> => {
  const response = await thinklibApi.post<IMechanicEditRequest>(
    `/api/mechanics/edit-requests/${editRequestId}/review`,
    { status, rejectReason }
  );
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
