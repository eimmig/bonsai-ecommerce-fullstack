import { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';

import { Button } from '@/components/ui';
import { useUserAddresses } from '@/hooks/use-address';
import { useTranslation } from '@/hooks/use-translation';
import type { Address } from '@/types/user.types';
import { AddressFormModal } from './AddressFormModal';
import './AddressSelector.css';

interface AddressSelectorProps {
  selectedAddressId?: string;
  onSelectAddress: (address: Address) => void;
  error?: string;
}

export const AddressSelector = ({ selectedAddressId, onSelectAddress, error }: AddressSelectorProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: addresses, isLoading } = useUserAddresses();

  const handleAddressSelect = (address: Address) => {
    onSelectAddress(address);
  };

  const handleNewAddressSuccess = () => {
    // Modal vai fechar e a lista será atualizada automaticamente
  };

  if (isLoading) {
    return (
      <div className="address-loading">
        <div className="address-loading-spinner" />
      </div>
    );
  }

  return (
    <div className="address-selector">
      <div className="address-selector-header">
        <h3 className="address-selector-title">{t('address.selectDelivery')}</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {t('address.newAddress')}
        </Button>
      </div>

      {error && <p className="address-selector-error">{error}</p>}

      <div className="address-list">
        {addresses && addresses.length > 0 ? (
          addresses.map((address) => (
            <button
              key={address.id}
              type="button"
              onClick={() => handleAddressSelect(address)}
              className={`address-card ${selectedAddressId === address.id ? 'selected' : ''}`}
            >
              <div className="address-card-content">
                <MapPin className="address-card-icon" />
                <div className="address-card-info">
                  <p className="address-card-street">
                    {address.street}, {address.number}
                  </p>
                  {address.complement && (
                    <p className="address-card-complement">{address.complement}</p>
                  )}
                  <p className="address-card-neighborhood">
                    {address.neighborhood} - {address.city}/{address.state}
                  </p>
                  <p className="address-card-zip">CEP: {address.zipCode}</p>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="address-empty">
            <MapPin className="address-empty-icon" />
            <p className="address-empty-text">{t('address.noAddress')}</p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
            >
              {t('address.registerFirst')}
            </Button>
          </div>
        )}
      </div>

      <AddressFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleNewAddressSuccess}
      />
    </div>
  );
};
