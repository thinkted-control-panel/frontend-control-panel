export type FileType = "Image" | "Gif";

export interface IStorageFile {
  downloadLink: string;
  fileId: string;
  fileType: string;
}
