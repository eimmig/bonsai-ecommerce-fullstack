import { useFeaturedProducts } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-add-to-cart';
import { ProductGrid } from '@/features/products';
import { SEO } from '@/components/seo';
import { TipsCard, Newsletter } from '@/components/shared';
import BannerImage from '@/assets/images/banner.svg';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { data: products, isLoading } = useFeaturedProducts();
  const { handleAddToCart } = useAddToCart();

  return (
    <div className="home-container">
      <SEO
        title="Início"
        description="Encontre bonsais autênticos, ferramentas profissionais e acessórios exclusivos. Cultivados com técnicas tradicionais japonesas há mais de 10 anos."
        keywords="bonsai, bonsais, comprar bonsai, loja de bonsai, plantas ornamentais, árvores em miniatura"
        url="/"
      />

      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>
            Encontre seu <br />
            <span className="highlight">bonsai</span> perfeito.
          </h1>
          <p>
            Descubra espécies selecionadas, cultivadas com cuidado e tradição japonesa.
          </p>
        </div>
        <div className="banner-image">
          <img src={BannerImage} alt="Banner de Bonsai" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container mx-auto px-4">
          <h2>Produtos em Destaque</h2>
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
            <h1>Sobre a loja</h1>
            <p>
              Cultivamos bonsais há mais de 10 anos com<br />
              técnicas tradicionais e entrega em todo o Brasil.<br />
              Nosso objetivo é levar equilíbrio, beleza e natureza<br />
              para sua casa.
            </p>
          </div>
          <div className="tips-intro">
            <h1>Dicas e Cuidados com Bonsai</h1>
            <p>
              Aprenda como manter seu bonsai sempre<br />
              saudável: rega correta, poda, adubação e luz<br />
              ideal.
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
              title="Dica 1 - Rega na medida certa"
              description="Regue apenas quando a camada superior do solo estiver seca ao toque."
            />
            <TipsCard
              icon={<i className="fa-solid fa-scissors" />}
              title="Dica 2 - Faça podas regulares"
              description="A poda ajuda na saúde e na estética do bonsai. Use tesouras apropriadas."
            />
            <TipsCard
              icon={<i className="fa-regular fa-sun" />}
              title="Dica 3 - Exposição à luz"
              description="Deixe seu bonsai em local com luz indireta e evite sol forte nas horas mais quentes."
            />
            <TipsCard
              icon={<i className="fa-solid fa-seedling" />}
              title="Dica 4 - Adubação equilibrada"
              description="Use adubos específicos para bonsai na primavera e no verão, respeitando as dosagens."
            />
            <TipsCard
              icon={<i className="fa-solid fa-wind" />}
              title="Dica 5 - Boa circulação de ar"
              description="Mantenha o ambiente arejado, mas proteja de correntes de ar muito frias."
            />
            <TipsCard
              icon={<i className="fa-solid fa-leaf" />}
              title="Dica 6 - Observação constante"
              description="Fique atento a sinais de pragas ou doenças e aja rapidamente para manter a saúde."
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};
