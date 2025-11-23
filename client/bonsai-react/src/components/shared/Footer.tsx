import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { ROUTES } from '@/constants/routes';
import './Footer.css';

const FooterComponent = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const { t } = useTranslation();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <h5 className="footer-title">{t('footer.institutional')}</h5>
            <ul className="footer-links">
              <li><Link to={ROUTES.ABOUT}>{t('footer.about')}</Link></li>
              <li><a href="#privacy">{t('footer.privacyPolicy')}</a></li>
              <li><a href="#terms">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">{t('footer.customerService')}</h5>
            <ul className="footer-links">
              <li><a href="#contact">{t('footer.contact')}</a></li>
              <li><a href="#returns">{t('footer.returns')}</a></li>
              <li><a href="#faq">{t('footer.faq')}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">{t('footer.contactTitle')}</h5>
            <ul className="footer-links">
              <li><a href="https://wa.me/5511123455678">{t('footer.whatsapp')}: (11) 12345-5678</a></li>
              <li><a href="mailto:contato@bonsaibrasil.com.br">{t('footer.email')}: contato@bonsaibrasil.com.br</a></li>
              <li>{t('footer.address')}</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">{t('footer.paymentMethods')}</h5>
            <div className="payment-methods">
              <div className="payment-column">
                <span>Mastercard</span>
                <span>Visa</span>
              </div>
              <div className="payment-column">
                <span>Pix</span>
                <span>Boleto</span>
              </div>
            </div>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">{t('footer.storeTitle')}</h5>
            <div className="store-info">
              <p>CNPJ 12.345.678/0001-99</p>
              <p>{t('footer.rightsReserved', { year: currentYear })}</p>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
