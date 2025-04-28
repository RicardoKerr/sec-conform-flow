
export type MessageRole = 'system' | 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  fileUrl?: string;
  fileName?: string;
}

export interface QuickQuestion {
  id: string;
  text: string;
}
