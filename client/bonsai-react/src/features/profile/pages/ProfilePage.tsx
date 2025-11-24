import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/auth-store';
import { useUpdateProfile } from '@/hooks/use-user';
import { useUserAddresses, useCreateAddress, useUpdateAddress } from '@/hooks/use-address';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { Button, Input, Card, CardContent, CardHeader, CardTitle, Select } from '@/components/ui';
import { maskCEP } from '@/utils/input-masks';
import { addressApi } from '@/api/address-api';
import {
  profileSchema,
  addressSchema,
  type ProfileFormData,
  type AddressFormData,
} from '../schemas/profile.schemas';
import './ProfilePage.css';

const BRAZILIAN_STATES = [
  { value: '', label: 'Selecione' },
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

export const ProfilePage = () => {
  const toast = useToast();
  const { user } = useAuthStore();
  const { updateProfile, isUpdating } = useUpdateProfile();
  const { data: addresses } = useUserAddresses();
  const { mutate: createAddress, isPending: isCreating } = useCreateAddress();
  const { mutate: updateAddress, isPending: isUpdatingAddress } = useUpdateAddress();
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId && addresses[0].id) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId]);

  const selectedAddress = addresses?.find(addr => addr.id === selectedAddressId);

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

  useEffect(() => {
    if (isAddingNew) {
      addressForm.reset({
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      });
    } else if (selectedAddress) {
      addressForm.reset({
        zipCode: selectedAddress.zipCode,
        street: selectedAddress.street,
        number: selectedAddress.number,
        complement: selectedAddress.complement || '',
        neighborhood: selectedAddress.neighborhood,
        city: selectedAddress.city,
        state: selectedAddress.state,
      });
    }
  }, [selectedAddress, isAddingNew, addressForm]);

  const handleCEPBlur = async (cep: string) => {
    const cleanCEP = cep.replaceAll(/\D/g, '');
    if (cleanCEP.length === 8) {
      setIsLoadingCEP(true);
      try {
        const data = await addressApi.getByCEP(cleanCEP);
        addressForm.setValue('street', data.logradouro);
        addressForm.setValue('neighborhood', data.bairro);
        addressForm.setValue('city', data.localidade);
        addressForm.setValue('state', data.uf);
        toast.success(t('address.found'));
      } catch {
        toast.error(t('address.notFound'));
      } finally {
        setIsLoadingCEP(false);
      }
    }
  };

  const handleProfileSubmit = (data: ProfileFormData) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success(t('profile.updateSuccess'));
      },
      onError: () => {
        toast.error(t('profile.updateError'));
      },
    });
  };

  const handleAddressSubmit = (data: AddressFormData) => {
    if (isAddingNew) {
      createAddress(data, {
        onSuccess: (newAddress) => {
          toast.success(t('address.createSuccess'));
          if (newAddress.id) {
            setSelectedAddressId(newAddress.id);
          }
          setIsAddingNew(false);
        },
        onError: () => {
          toast.error(t('address.createError'));
        },
      });
    } else if (selectedAddressId) {
      updateAddress(
        { id: selectedAddressId, data },
        {
          onSuccess: () => {
            toast.success(t('address.updateSuccess'));
          },
          onError: () => {
            toast.error(t('address.updateError'));
          },
        }
      );
    }
  };

  const handleAddNewAddress = () => {
    setIsAddingNew(true);
    setSelectedAddressId(null);
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    setIsAddingNew(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h1>{t('profile.title')}</h1>
          <p>{t('profile.subtitle')}</p>
        </div>

        <div className="profile-grid">
          {/* Coluna Esquerda - Info do Usuário */}
          <div className="profile-sidebar">
            {/* Card de Info Resumida */}
            <Card className="user-card">
              <CardContent>
                <div className="user-card-content">
                  <div className="user-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                  </div>
                  <div className="user-stats">
                    <div className="user-stats-content">
                      <MapPin className="user-stats-icon" />
                      <span>{t('profile.addressCount', { count: addresses?.length || 0 })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Formulários */}
          <div className="profile-content">
            {/* Profile Info */}
            <Card className="form-card">
              <CardHeader className="form-card-header">
                <CardTitle>
                  <div className="form-card-title">
                    <div className="form-card-icon-wrapper">
                      <User className="form-card-icon" />
                    </div>
                    <span>{t('profile.personalInfo')}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="form-card-content">
                <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="profile-form">
                  <Input
                    label={t('profile.fullName')}
                    fullWidth
                    error={profileForm.formState.errors.name?.message}
                    {...profileForm.register('name')}
                  />

                  <Input
                    label={t('profile.email')}
                    type="email"
                    fullWidth
                    error={profileForm.formState.errors.email?.message}
                    {...profileForm.register('email')}
                  />

                  <div className="form-actions">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isUpdating}
                    >
                      {t('profile.saveChanges')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Address */}
            <Card className="form-card">
              <CardHeader className="form-card-header">
                <CardTitle>
                  <div className="form-card-title">
                    <div className="form-card-icon-wrapper">
                      <MapPin className="form-card-icon" />
                    </div>
                    <span>{t('profile.addresses')}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="form-card-content">
                {/* Lista de endereços */}
                {addresses && addresses.length > 0 && (
                  <div className="address-list">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => address.id && handleSelectAddress(address.id)}
                        className={`address-item ${selectedAddressId === address.id ? 'address-item-active' : ''}`}
                      >
                        <MapPin className="address-item-icon" />
                        <div className="address-item-content">
                          <span className="address-item-street">
                            {address.street}, {address.number}
                          </span>
                          <span className="address-item-details">
                            {address.neighborhood} - {address.city}/{address.state}
                          </span>
                        </div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddNewAddress}
                      className={`address-item address-item-new ${isAddingNew ? 'address-item-active' : ''}`}
                    >
                      <span className="address-item-plus">+</span>
                      <span>{t('profile.addNewAddress')}</span>
                    </button>
                  </div>
                )}

                {/* Formulário de endereço */}
                <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)} className="profile-form">
                  <Input
                    label={t('address.zipCode')}
                    fullWidth
                    error={addressForm.formState.errors.zipCode?.message}
                    disabled={isLoadingCEP}
                    {...addressForm.register('zipCode')}
                    onChange={(e) => {
                      e.target.value = maskCEP(e.target.value);
                      addressForm.setValue('zipCode', e.target.value);
                    }}
                    onBlur={(e) => handleCEPBlur(e.target.value)}
                    placeholder="00000-000"
                  />

                  <Input
                    label={t('address.street')}
                    fullWidth
                    disabled={isLoadingCEP}
                    error={addressForm.formState.errors.street?.message}
                    {...addressForm.register('street')}
                  />

                  <div className="form-grid">
                    <Input
                      label={t('address.number')}
                      error={addressForm.formState.errors.number?.message}
                      {...addressForm.register('number')}
                    />
                    <Input
                      label={t('address.complement')}
                      {...addressForm.register('complement')}
                    />
                  </div>

                  <Input
                    label={t('address.neighborhood')}
                    fullWidth
                    disabled={isLoadingCEP}
                    error={addressForm.formState.errors.neighborhood?.message}
                    {...addressForm.register('neighborhood')}
                  />

                  <div className="form-grid">
                    <Input
                      label={t('address.city')}
                      disabled={isLoadingCEP}
                      error={addressForm.formState.errors.city?.message}
                      {...addressForm.register('city')}
                    />
                    <Select
                      label={t('address.state')}
                      disabled={isLoadingCEP}
                      error={addressForm.formState.errors.state?.message}
                      options={BRAZILIAN_STATES}
                      {...addressForm.register('state')}
                    />
                  </div>

                  <div className="form-actions">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      isLoading={isCreating || isUpdatingAddress || isLoadingCEP}
                    >
                      {isAddingNew ? t('address.create') : t('address.update')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
