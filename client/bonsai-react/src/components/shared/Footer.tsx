import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import './Footer.css';

const FooterComponent = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-columns">
          <div className="footer-column">
            <h5 className="footer-title">Institucional</h5>
            <ul className="footer-links">
              <li><Link to={ROUTES.ABOUT}>Sobre nós</Link></li>
              <li><a href="#privacy">Política de Privacidade</a></li>
              <li><a href="#terms">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Atendimento</h5>
            <ul className="footer-links">
              <li><a href="#contact">Fale Conosco</a></li>
              <li><a href="#returns">Trocas e Devoluções</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Contato</h5>
            <ul className="footer-links">
              <li><a href="https://wa.me/5511123455678">WhatsApp: (11) 12345-5678</a></li>
              <li><a href="mailto:contato@bonsaibrasil.com.br">Email: contato@bonsaibrasil.com.br</a></li>
              <li>Rua das Cerejeiras, 108 - Bairro Verde, São Paulo/SP</li>
            </ul>
          </div>

          <div className="footer-column">
            <h5 className="footer-title">Formas de Pagamento</h5>
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
            <h5 className="footer-title">Loja Bonsai Brasil</h5>
            <div className="store-info">
              <p>CNPJ 12.345.678/0001-99</p>
              <p>Todos os direitos reservados  {currentYear}</p>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p> {currentYear} Bonsai Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
