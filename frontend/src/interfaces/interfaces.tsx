export interface Article {
    id: string;
    original_text: string;
    score: number;
  }

export interface ChatResponse {
  gptResponse: string;
  articles: Article[];
}