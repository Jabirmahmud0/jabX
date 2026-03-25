import { SEO } from '@/constants/seo';

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SEO.siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Section anchors — helps Google understand page structure
    {
      url: `${SEO.siteUrl}/#about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SEO.siteUrl}/#services`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SEO.siteUrl}/#portfolio`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SEO.siteUrl}/#contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
