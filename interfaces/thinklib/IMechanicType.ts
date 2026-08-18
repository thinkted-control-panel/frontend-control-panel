export interface IMechanicType {
  id: string;
  name: string;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface IMechanicTypeListResponse {
  items: IMechanicType[];
}
