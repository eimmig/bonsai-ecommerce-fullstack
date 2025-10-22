import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

const DEFAULT_SEO = {
  siteName: 'Bonsai Brasil',
  defaultTitle: 'Bonsai Brasil - Loja de Bonsais e Acessórios',
  defaultDescription:
    'Cultivamos bonsais há mais de 10 anos com técnicas tradicionais. Compre bonsais, ferramentas e acessórios com entrega em todo o Brasil.',
  defaultImage: '/images/og-image.jpg',
  siteUrl: 'https://bonsaibrasil.com.br',
  twitterHandle: '@bonsaibrasil',
};

export const SEO = ({
  title,
  description = DEFAULT_SEO.defaultDescription,
  keywords = 'bonsai, bonsais, plantas, árvores em miniatura, jardinagem, paisagismo',
  image = DEFAULT_SEO.defaultImage,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) => {
  const pageTitle = title
    ? `${title} | ${DEFAULT_SEO.siteName}`
    : DEFAULT_SEO.defaultTitle;

  const canonicalUrl = url
    ? `${DEFAULT_SEO.siteUrl}${url}`
    : DEFAULT_SEO.siteUrl;

  const imageUrl = image.startsWith('http')
    ? image
    : `${DEFAULT_SEO.siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional SEO */}
      <meta name="author" content={DEFAULT_SEO.siteName} />
      <meta name="language" content="pt-BR" />
    </Helmet>
  );
};
