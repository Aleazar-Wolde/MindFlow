// src/services/taskService.ts
import axios from 'axios';
import type { Task } from '../types';

// Configure baseURL to your Spring Boot backend
export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// CRUD API calls
export const getTasks = () => api.get<Task[]>('/tasks');
export const getTaskById = (id: string) => api.get<Task>(`/tasks/${id}`);
export const createTask = (task: Partial<Task>) => api.post<Task>('/tasks', task);
export const updateTask = (id: string, task: Partial<Task>) => api.put<Task>(`/tasks/${id}`, task);
export const deleteTask = (id: string) => api.delete<void>(`/tasks/${id}`);