import { useFeaturedProducts } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-add-to-cart';
import { useTranslation } from '@/hooks/use-translation';
import { ProductGrid } from '@/features/products';
import { SEO } from '@/components/seo';
import { TipsCard, Newsletter } from '@/components/shared';
import BannerImage from '@/assets/images/banner.svg';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { data: products, isLoading } = useFeaturedProducts();
  const { handleAddToCart } = useAddToCart();
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <SEO
        title={t('home.seoTitle')}
        description={t('home.seoDescription')}
        keywords={t('home.seoKeywords')}
        url="/"
      />

      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>
            {t('home.hero.title')} <br />
            <span className="highlight">{t('home.hero.highlight')}</span> {t('home.hero.titleEnd')}
          </h1>
          <p>
            {t('home.hero.subtitle')}
          </p>
        </div>
        <div className="banner-image">
          <img src={BannerImage} alt={t('home.hero.bannerAlt')} />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container mx-auto px-4">
          <h2>{t('home.featuredProducts')}</h2>
          <ProductGrid
            products={products || []}
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* About Bonsai Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <h1>{t('home.about.title')}</h1>
            <p>
              {t('home.about.description1')}<br />
              {t('home.about.description2')}<br />
              {t('home.about.description3')}<br />
              {t('home.about.description4')}
            </p>
          </div>
          <div className="tips-intro">
            <h1>{t('home.tips.title')}</h1>
            <p>
              {t('home.tips.subtitle1')}<br />
              {t('home.tips.subtitle2')}<br />
              {t('home.tips.subtitle3')}
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <div className="container mx-auto px-4">
          <div className="tips-grid">
            <TipsCard
              icon={<i className="fa-solid fa-droplet" />}
              title={t('home.tips.tip1.title')}
              description={t('home.tips.tip1.description')}
            />
            <TipsCard
              icon={<i className="fa-solid fa-scissors" />}
              title={t('home.tips.tip2.title')}
              description={t('home.tips.tip2.description')}
            />
            <TipsCard
              icon={<i className="fa-regular fa-sun" />}
              title={t('home.tips.tip3.title')}
              description={t('home.tips.tip3.description')}
            />
            <TipsCard
              icon={<i className="fa-solid fa-seedling" />}
              title={t('home.tips.tip4.title')}
              description={t('home.tips.tip4.description')}
            />
            <TipsCard
              icon={<i className="fa-solid fa-wind" />}
              title={t('home.tips.tip5.title')}
              description={t('home.tips.tip5.description')}
            />
            <TipsCard
              icon={<i className="fa-solid fa-leaf" />}
              title={t('home.tips.tip6.title')}
              description={t('home.tips.tip6.description')}
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};
