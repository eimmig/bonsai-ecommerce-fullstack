import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import './Newsletter.css';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      console.log('Newsletter subscription:', email);
      alert(t('footer.subscriptionSuccess'));
      setEmail('');
    } catch (error) {
      alert(t('footer.subscriptionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2>{t('footer.newsletterTitle')}</h2>
        <p>{t('footer.newsletterDescription')}</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t('footer.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-subscribe" disabled={isSubmitting}>
            {isSubmitting ? t('footer.subscribing') : t('footer.subscribe')}
          </button>
        </form>
      </div>
    </section>
  );
};
