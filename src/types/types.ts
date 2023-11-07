export interface Quote {
  _id: string;
  content: string;
}

export interface Score {
  id: number;
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}
