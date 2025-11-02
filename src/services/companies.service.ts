import { api } from './api';
import { Company, CreateCompanyPayload, UpdateCompanyPayload } from '../types';

export const companiesService = {
  // Get all companies
  async getCompanies(): Promise<Company[]> {
    return api.get<Company[]>('/property-management/companies');
  },

  // Get company by ID
  async getCompany(id: number): Promise<Company> {
    return api.get<Company>(`/property-management/companies/${id}`);
  },

  // Create new company
  async createCompany(data: CreateCompanyPayload): Promise<Company> {
    return api.post<Company>('/property-management/companies', data);
  },

  // Update company
  async updateCompany(id: number, data: UpdateCompanyPayload): Promise<Company> {
    return api.patch<Company>(`/property-management/companies/${id}`, data);
  },

  // Delete company
  async deleteCompany(id: number): Promise<void> {
    return api.delete<void>(`/property-management/companies/${id}`);
  },
};