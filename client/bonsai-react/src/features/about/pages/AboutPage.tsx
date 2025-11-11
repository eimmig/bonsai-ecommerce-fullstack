import { TipsCard } from '@/components/shared';
import { Newsletter } from '@/components/shared/Newsletter';
import './AboutPage.css';

const tips = [
  {
    icon: '💧',
    title: 'Rega Adequada',
    description: 'Mantenha o solo úmido, mas não encharcado.',
  },
  {
    icon: '✂️',
    title: 'Poda Regular',
    description: 'Pode galhos e raízes para manter a forma.',
  },
  {
    icon: '☀️',
    title: 'Iluminação',
    description: 'Luz indireta é ideal para a maioria das espécies.',
  },
  {
    icon: '🌱',
    title: 'Adubação',
    description: 'Use fertilizante específico durante a primavera.',
  },
];

export const AboutPage = () => {
  return (
    <>
      {/* About Bonsai Section */}
      <section className="about-bonsai-section">
        <div className="container">
          <div className="about-store">
            <h1>Sobre a loja</h1>
            <p>
              Cultivamos bonsais há mais de 10 anos com<br />
              técnicas tradicionais e entrega em todo o Brasil.<br />
              Nosso objetivo é levar equilíbrio, beleza e natureza<br />
              para sua casa.
            </p>
          </div>
          <div className="care-and-tips">
            <h1>Dicas e Cuidados com Bonsai</h1>
            <p>
              Aprenda como manter seu bonsai sempre<br />
              saudável: rega correta, poda, adubação e luz<br />
              ideal.
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
