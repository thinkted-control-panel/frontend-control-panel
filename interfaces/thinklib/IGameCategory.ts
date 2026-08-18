export interface IGameCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string | null;
}

export interface IGameCategoryListResponse {
  items: IGameCategory[];
}
