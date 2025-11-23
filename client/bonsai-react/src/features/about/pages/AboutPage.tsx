import { TipsCard } from '@/components/shared';
import { Newsletter } from '@/components/shared/Newsletter';
import { useTranslation } from '@/hooks/use-translation';
import './AboutPage.css';

export const AboutPage = () => {
  const { t } = useTranslation();

  const tips = [
    {
      icon: '💧',
      title: t('about.tips.watering.title'),
      description: t('about.tips.watering.description'),
    },
    {
      icon: '✂️',
      title: t('about.tips.pruning.title'),
      description: t('about.tips.pruning.description'),
    },
    {
      icon: '☀️',
      title: t('about.tips.lighting.title'),
      description: t('about.tips.lighting.description'),
    },
    {
      icon: '🌱',
      title: t('about.tips.fertilizing.title'),
      description: t('about.tips.fertilizing.description'),
    },
  ];
  return (
    <>
      {/* About Bonsai Section */}
      <section className="about-bonsai-section">
        <div className="container">
          <div className="about-store">
            <h1>{t('about.store.title')}</h1>
            <p>
              {t('about.store.description')}
            </p>
          </div>
          <div className="care-and-tips">
            <h1>{t('about.care.title')}</h1>
            <p>
              {t('about.care.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section (Dicas) */}
      <section className="tips-section">
        <div className="container">
          <div className="tips" id="tips-container-about">
            {tips.map((tip) => (
              <TipsCard
                key={tip.title}
                icon={tip.icon}
                title={tip.title}
                description={tip.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};
