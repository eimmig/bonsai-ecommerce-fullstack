import './CreditCardPreview.css';

interface CreditCardPreviewProps {
  cardNumber: string;
  cardHolder: string;
  cardExpiry: string;
  cardCvv: string;
  focusedField: 'number' | 'holder' | 'expiry' | 'cvv' | null;
}

export const CreditCardPreview = ({
  cardNumber,
  cardHolder,
  cardExpiry,
  cardCvv,
  focusedField,
}: CreditCardPreviewProps) => {
  const isFlipped = focusedField === 'cvv';

  const formatCardNumber = (number: string) => {
    if (!number) return '•••• •••• •••• ••••';
    const formatted = number.padEnd(19, '•');
    return formatted.match(/.{1,4}/g)?.join(' ') || formatted;
  };

  return (
    <div className="credit-card-preview">
      <div className={`credit-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div className="credit-card-front">
          <div className="credit-card-chip" />
          <div className="credit-card-logo">VISA</div>
          <div className={`credit-card-number ${focusedField === 'number' ? 'focused' : ''}`}>
            {formatCardNumber(cardNumber)}
          </div>
          <div className="credit-card-details">
            <div className="credit-card-holder">
              <div className="credit-card-label">Titular</div>
              <div className={`credit-card-value ${focusedField === 'holder' ? 'focused' : ''}`}>
                {cardHolder || 'NOME NO CARTÃO'}
              </div>
            </div>
            <div className="credit-card-expiry">
              <div className="credit-card-label">Validade</div>
              <div className={`credit-card-value ${focusedField === 'expiry' ? 'focused' : ''}`}>
                {cardExpiry || 'MM/AA'}
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="credit-card-back">
          <div className="credit-card-stripe" />
          <div className="credit-card-cvv-container">
            <div className="credit-card-label">CVV</div>
            <div className={`credit-card-cvv ${focusedField === 'cvv' ? 'focused' : ''}`}>
              {cardCvv || '•••'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
