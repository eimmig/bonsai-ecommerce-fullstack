import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { Button, Input, Select } from '@/components/ui';
import { useCreateAddress } from '@/hooks/use-address';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { maskCEP } from '@/utils/input-masks';
import { addressSchema, type AddressFormData } from '@/features/profile/schemas/profile.schemas';
import { addressApi } from '@/api/address-api';
import './AddressFormModal.css';

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

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddressFormModal = ({ isOpen, onClose, onSuccess }: AddressFormModalProps) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { mutate: createAddress, isPending } = useCreateAddress();
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddressFormData>({
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

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCEPBlur = async (cep: string) => {
    const cleanCEP = cep.replaceAll(/\D/g, '');
    if (cleanCEP.length === 8) {
      setIsLoadingCEP(true);
      try {
        const data = await addressApi.getByCEP(cleanCEP);
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        toast.success(t('address.found'));
      } catch {
        toast.error(t('address.notFound'));
      } finally {
        setIsLoadingCEP(false);
      }
    }
  };

  const onSubmit = (data: AddressFormData) => {
    createAddress(data, {
      onSuccess: () => {
        toast.success(t('address.createSuccess'));
        reset();
        onSuccess?.();
        onClose();
      },
      onError: () => {
        toast.error(t('address.createError'));
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={handleClose}
          className="modal-close-button"
          aria-label={t('common.close')}
        >
          <X />
        </button>

        <h2 className="modal-title">{t('address.modalTitle')}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <Input
            label={t('address.zipCode')}
            placeholder="00000-000"
            error={errors.zipCode?.message}
            {...register('zipCode')}
            onChange={(e) => {
              e.target.value = maskCEP(e.target.value);
              setValue('zipCode', e.target.value);
            }}
            onBlur={(e) => handleCEPBlur(e.target.value)}
            disabled={isLoadingCEP}
            fullWidth
          />

          <Input
            label={t('address.street')}
            placeholder={t('address.streetPlaceholder')}
            error={errors.street?.message}
            {...register('street')}
            fullWidth
          />

          <div className="modal-form-row">
            <Input
              label={t('address.number')}
              placeholder="123"
              error={errors.number?.message}
              {...register('number')}
              fullWidth
            />
            <Input
              label={t('address.complement')}
              placeholder={t('address.complementPlaceholder')}
              error={errors.complement?.message}
              {...register('complement')}
              fullWidth
            />
          </div>

          <Input
            label={t('address.neighborhood')}
            placeholder={t('address.neighborhoodPlaceholder')}
            error={errors.neighborhood?.message}
            {...register('neighborhood')}
            fullWidth
          />

          <div className="modal-form-row">
            <Input
              label={t('address.city')}
              placeholder={t('address.cityPlaceholder')}
              error={errors.city?.message}
              {...register('city')}
              fullWidth
            />
            <Select
              label={t('address.state')}
              error={errors.state?.message}
              {...register('state')}
              options={BRAZILIAN_STATES}
              fullWidth
            />
          </div>

          <div className="modal-actions">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              {t('common.cancel')}
            </Button>
            <Button type="submit" variant="primary" isLoading={isPending}>
              {t('address.create')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
