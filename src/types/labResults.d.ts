export interface LabResult {
  _id?: string;
  isNormal: boolean;
  labOrderTestId: string;
  resultValue?: number;
  commentaire?: string;
  date: string | Date;
  status: 'pending' | 'completed' | 'canceled';
  fileDocumentId?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
