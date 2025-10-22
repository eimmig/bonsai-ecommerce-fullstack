import { useState } from 'react';
import './Newsletter.css';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      console.log('Newsletter subscription:', email);
      alert('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      alert('Erro ao se inscrever. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2>Receba ofertas e novidades.</h2>
        <p>Cadastre seu e-mail e fique por dentro das promoções e novos produtos</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-subscribe" disabled={isSubmitting}>
            {isSubmitting ? 'Inscrevendo...' : 'Inscrever-se'}
          </button>
        </form>
      </div>
    </section>
  );
};
