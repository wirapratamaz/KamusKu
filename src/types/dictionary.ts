export interface DictionaryResponse {
  word: string;
  definition: string;
}

export interface KBBDictionaryData {
  lema: string;
  arti: { deskripsi: string }[];
  tesaurusLink: string;
}

export interface KBBIAPIResponse {
  success: boolean;
  status: number;
  message: string;
  data: KBBDictionaryData[];
}
