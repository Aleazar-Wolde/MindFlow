// src/services/userService.ts
import axios from 'axios';
import type { User } from '../types';

export const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Fetch all users (admin)
export const getUsers = () => api.get<User[]>('/users');
// Fetch single user by ID
export const getUserById = (id: string) => api.get<User>(`/users/${id}`);
// Fetch user by email (login lookup)
export const getUserByEmail = (email: string) => api.get<User>(`/users/by-email`, { params: { email } });
// Create new user (registration)
export const createUser = (user: Partial<User>) => api.post<User>('/users', user);
// Update existing user
export const updateUser = (id: string, user: Partial<User>) => api.put<User>(`/users/${id}`, user);
// Delete user
export const deleteUser = (id: string) => api.delete<void>(`/users/${id}`);

