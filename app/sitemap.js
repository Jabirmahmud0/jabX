import { SEO } from '@/constants/seo';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: `${SEO.siteUrl}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];
}
