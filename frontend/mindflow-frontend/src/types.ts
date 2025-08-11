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
// src/types.ts (add User interface)
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}
