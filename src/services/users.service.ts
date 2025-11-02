import { api } from './api';
import { UserListItem, CreateUserPayload, UpdateUserPayload } from '../types';

export const usersService = {
  // Get all users
  async getUsers(): Promise<UserListItem[]> {
    return api.get<UserListItem[]>('/users');
  },

  // Get user by ID
  async getUser(id: number): Promise<UserListItem> {
    return api.get<UserListItem>(`/users/${id}`);
  },

  // Create new user
  async createUser(data: CreateUserPayload): Promise<UserListItem> {
    return api.post<UserListItem>('/users/register', data);
  },

  // Update user
  async updateUser(id: number, data: UpdateUserPayload): Promise<UserListItem> {
    return api.patch<UserListItem>(`/users/${id}`, data);
  },

  // Delete user
  async deleteUser(id: number): Promise<void> {
    return api.delete<void>(`/users/${id}`);
  },
};