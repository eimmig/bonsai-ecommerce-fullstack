import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { addressApi } from '@/api/address-api';
import type { Address } from '@/types/user.types';

export const useAddressByCEP = (cep: string) => {
  return useQuery({
    queryKey: ['address', cep],
    queryFn: () => addressApi.getByCEP(cep),
    enabled: cep.replaceAll(/\D/g, '').length === 8,
    retry: false,
  });
};

export const useUserAddresses = () => {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: () => addressApi.getUserAddresses(),
  });
};

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: Omit<Address, 'id' | 'userId'>) => addressApi.createAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Address> }) => 
      addressApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
