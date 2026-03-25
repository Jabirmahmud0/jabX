import { SEO } from '@/constants/seo';

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SEO.siteUrl}/#person`,
        "name": SEO.author,
        "url": SEO.siteUrl,
        "image": {
          "@type": "ImageObject",
          "url": `${SEO.siteUrl}/assets/images/jabir.webp`,
          "width": 400,
          "height": 400,
        },
        "jobTitle": "Creative Developer",
        "description": "UI/UX designer, frontend developer, and AI tools builder from Bangladesh. Available globally.",
        "knowsAbout": ["React", "Next.js", "UI/UX Design", "AI Tools", "Three.js", "Framer Motion", "Tailwind CSS", "Python"],
        "address": { "@type": "PostalAddress", "addressCountry": "BD" },
        "email": "jaabirmahmud01@gmail.com",
        "sameAs": [
          SEO.github,
          SEO.linkedIn,
          `https://twitter.com/${SEO.twitterHandle.replace('@', '')}`,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SEO.siteUrl}/#website`,
        "url": SEO.siteUrl,
        "name": `${SEO.siteName} — ${SEO.author}`,
        "description": "Creative developer portfolio — UI/UX, AI Tools, React development.",
        "publisher": { "@id": `${SEO.siteUrl}/#person` },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SEO.siteUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SEO.siteUrl}/#service`,
        "name": "jabx_fx — Freelance Creative Development",
        "url": SEO.siteUrl,
        "description": "Freelance creative development — UI/UX design, React development, AI tools.",
        "provider": { "@id": `${SEO.siteUrl}/#person` },
        "areaServed": "Worldwide",
        "priceRange": "$299 – $1,499+",
        "serviceType": ["UI/UX Design", "Frontend Development", "AI Tool Development", "Full Product Build"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Freelance Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design Systems", "description": "Figma-first design systems, component libraries, and developer-handoff-ready deliverables." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Frontend Development", "description": "React + Next.js + Tailwind pixel-perfect builds with 90+ Lighthouse scores." } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Tool Development", "description": "Custom AI-powered apps — chatbots, content tools, automation dashboards with LLM APIs." } },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SEO.siteUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does Jabir Mahmud offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Jabir Mahmud offers UI/UX design systems, frontend development (React/Next.js), AI tool development, and full product builds. Services start at $299.",
            },
          },
          {
            "@type": "Question",
            "name": "How do I hire Jabir Mahmud as a freelance developer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can reach Jabir via the contact form at jabx.pro.bd or email jaabirmahmud01@gmail.com. He responds within 24 hours and offers a free 30-minute discovery call.",
            },
          },
          {
            "@type": "Question",
            "name": "Is Jabir Mahmud available for remote freelance work globally?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Jabir is based in Bangladesh and available for remote work with clients worldwide. All communication and delivery is handled online.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
