export interface IMechanicSourceFile {
  id: string;
  fileName: string;
  fileContent: string;
}

export interface IMechanicFile {
  downloadLink: string;
  fileId: string;
  fileType: string;
}

export type ApprovalStatus = "Pending" | "Approved" | "Rejected";

export interface IMechanic {
  id: string;
  name?: string;
  presentationText?: string;
  description?: string;
  imageUrl?: string;
  gifUrl?: string;
  videoUrl?: string;
  unityVersion?: string;
  sourceFiles?: IMechanicSourceFile[];
  categoryName?: string;
  typeName?: string;
  devName?: string;
  createdAt: string;
  updatedAt?: string | null;
  approvalStatus?: ApprovalStatus;
  reviewedByName?: string | null;
  reviewedAt?: string | null;
  rejectReason?: string | null;
}

export interface IMechanicListResponse {
  items: IMechanic[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IMechanicEditRequest {
  id: string;
  mechanicId: string;
  mechanicName: string;
  createdAt: string;
  name: string;
  presentationText: string;
  description: string;
  videoUrl: string;
  unityVersion: string;
  categoryName: string;
  typeName: string;
  requestedByName: string;
  approvalStatus: ApprovalStatus;
  reviewedByName?: string | null;
  reviewedAt?: string | null;
  rejectReason?: string | null;
  message?: string | null;
}

export interface IMechanicEditRequestListResponse {
  items: IMechanicEditRequest[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface IMechanicCreatePayload {
  name: string;
  presentationText: string;
  description: string;
  videoUrl: string;
  unityVersion: string;
  sourceFiles: { fileName: string; fileContent: string }[];
  categoryId: string;
  typeId: string;
  files: IMechanicFile[];
}

export interface IMechanicUpdatePayload {
  name: string;
  presentationText: string;
  description: string;
  videoUrl: string;
  unityVersion: string;
  sourceFiles: { fileName: string; fileContent: string }[];
  categoryId: string;
  typeId: string;
  imageFile?: File | null;
  gifFile?: File | null;
  files?: IMechanicFile[];
}
