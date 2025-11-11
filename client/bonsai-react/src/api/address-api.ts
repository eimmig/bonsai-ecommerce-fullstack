import { apiClient } from '@/lib/api-client';
import { ENDPOINTS } from '@/constants/endpoints';
import type { Address } from '@/types/user.types';

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const addressApi = {
  getByCEP: async (cep: string): Promise<ViaCEPResponse> => {
    const cleanCEP = cep.replaceAll(/\D/g, '');
    const response = await apiClient.get<ViaCEPResponse>(`https://viacep.com.br/ws/${cleanCEP}/json/`);
    
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return response.data;
  },

  getUserAddresses: async (): Promise<Address[]> => {
    const response = await apiClient.get<Address[]>(ENDPOINTS.ADDRESSES);
    return response.data;
  },

  createAddress: async (address: Omit<Address, 'id' | 'userId'>): Promise<Address> => {
    const response = await apiClient.post<Address>(ENDPOINTS.ADDRESSES, address);
    return response.data;
  },

  updateAddress: async (id: number, address: Partial<Address>): Promise<Address> => {
    const response = await apiClient.put<Address>(`${ENDPOINTS.ADDRESSES}/${id}`, address);
    return response.data;
  },

  deleteAddress: async (id: number): Promise<void> => {
    await apiClient.delete(`${ENDPOINTS.ADDRESSES}/${id}`);
  },
};
