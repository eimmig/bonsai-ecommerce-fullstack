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
    const response = await apiClient.get<{ content: Address[] }>(ENDPOINTS.ADDRESSES.LIST);
    return response.data.content;
  },

  getAddressById: async (id: string): Promise<Address> => {
    const response = await apiClient.get<Address>(ENDPOINTS.ADDRESSES.BY_ID(id));
    return response.data;
  },

  createAddress: async (address: Omit<Address, 'id' | 'userId'>): Promise<Address> => {
    const response = await apiClient.post<Address>(ENDPOINTS.ADDRESSES.CREATE, address);
    return response.data;
  },

  updateAddress: async (id: string, address: Partial<Omit<Address, 'id' | 'userId'>>): Promise<Address> => {
    const response = await apiClient.put<Address>(ENDPOINTS.ADDRESSES.UPDATE(id), address);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<void> => {
    await apiClient.delete(ENDPOINTS.ADDRESSES.DELETE(id));
  },
};
