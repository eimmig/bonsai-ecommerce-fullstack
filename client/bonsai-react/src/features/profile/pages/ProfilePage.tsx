import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, MapPin, Lock } from 'lucide-react';

import { useAuthStore } from '@/stores/auth-store';
import { useUpdateProfile } from '@/hooks/use-user';
import { useUserAddresses, useCreateAddress, useUpdateAddress } from '@/hooks/use-address';
import { useToast } from '@/hooks/use-toast';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { maskCEP } from '@/utils/input-masks';
import {
  profileSchema,
  addressSchema,
  passwordSchema,
  type ProfileFormData,
  type AddressFormData,
  type PasswordFormData,
} from '../schemas/profile.schemas';

export const ProfilePage = () => {
  const toast = useToast();
  const { user } = useAuthStore();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const { data: addresses } = useUserAddresses();
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  const { mutate: updateAddress, isPending: isUpdatingAddress } = useUpdateAddress();

  const userAddress = addresses?.[0]; // Pegando o primeiro endereço do usuário

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  });

  // Preenche o formulário quando o endereço for carregado
  useEffect(() => {
    if (userAddress) {
      addressForm.reset({
        zipCode: userAddress.zipCode,
        street: userAddress.street,
        number: userAddress.number,
        complement: userAddress.complement || '',
        neighborhood: userAddress.neighborhood,
        city: userAddress.city,
        state: userAddress.state,
      });
    }
  }, [userAddress, addressForm]);

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleProfileSubmit = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success('Perfil atualizado com sucesso!');
      },
      onError: () => {
        toast.error('Erro ao atualizar perfil');
      },
    });
  };

  const handleAddressSubmit = (data: AddressFormData) => {
    if (userAddress?.id) {
      // Atualizar endereço existente
      updateAddress(
        { id: userAddress.id, data },
        {
          onSuccess: () => {
            toast.success('Endereço atualizado com sucesso!');
          },
          onError: () => {
            toast.error('Erro ao atualizar endereço');
          },
        }
      );
    } else {
      // Criar novo endereço
      createAddress(data, {
        onSuccess: () => {
          toast.success('Endereço cadastrado com sucesso!');
        },
        onError: () => {
          toast.error('Erro ao cadastrar endereço');
        },
      });
    }
  };

  const handlePasswordSubmit = (_data: PasswordFormData) => {
    toast.info('Funcionalidade de alteração de senha em desenvolvimento');
    passwordForm.reset();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Meu Perfil</h1>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações Pessoais
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
              <Input
                label="Nome completo"
                fullWidth
                error={profileForm.formState.errors.name?.message}
                {...profileForm.register('name')}
              />

              <Input
                label="Email"
                type="email"
                fullWidth
                error={profileForm.formState.errors.email?.message}
                {...profileForm.register('email')}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isUpdating}
                >
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Endereço
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="space-y-4">
              <Input
                label="CEP"
                fullWidth
                error={addressForm.formState.errors.zipCode?.message}
                {...addressForm.register('zipCode')}
                onChange={(e) => {
                  e.target.value = maskCEP(e.target.value);
                  addressForm.setValue('zipCode', e.target.value);
                }}
              />

              <Input
                label="Logradouro"
                fullWidth
                error={addressForm.formState.errors.street?.message}
                {...addressForm.register('street')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Número"
                  fullWidth
                  error={addressForm.formState.errors.number?.message}
                  {...addressForm.register('number')}
                />
                <Input
                  label="Complemento"
                  fullWidth
                  {...addressForm.register('complement')}
                />
              </div>

              <Input
                label="Bairro"
                fullWidth
                error={addressForm.formState.errors.neighborhood?.message}
                {...addressForm.register('neighborhood')}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cidade"
                  fullWidth
                  error={addressForm.formState.errors.city?.message}
                  {...addressForm.register('city')}
                />
                <Input
                  label="Estado"
                  fullWidth
                  maxLength={2}
                  error={addressForm.formState.errors.state?.message}
                  {...addressForm.register('state')}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isCreating || isUpdatingAddress}
                >
                  {userAddress ? 'Salvar Alterações' : 'Cadastrar Endereço'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Alterar Senha
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
              <Input
                label="Senha Atual"
                type="password"
                fullWidth
                error={passwordForm.formState.errors.currentPassword?.message}
                {...passwordForm.register('currentPassword')}
              />

              <Input
                label="Nova Senha"
                type="password"
                fullWidth
                error={passwordForm.formState.errors.newPassword?.message}
                {...passwordForm.register('newPassword')}
              />

              <Input
                label="Confirmar Nova Senha"
                type="password"
                fullWidth
                error={passwordForm.formState.errors.confirmPassword?.message}
                {...passwordForm.register('confirmPassword')}
              />

              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="md">
                  Alterar Senha
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
