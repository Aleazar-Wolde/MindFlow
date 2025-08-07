// src/types.ts
export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: string;
  estimatedMinutes?: number;
  importance?: number;
  status: string;
  createdAt: string;
}