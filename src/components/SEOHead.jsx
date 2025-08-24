import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords = "", 
  url, 
  image = "https://www.bookyourride.in/images/bike-rent-logo-2.png",
  type = "website",
  schemaType = "WebPage"
}) => {
  const defaultKeywords = "bike rental, motorcycle rental, scooter rental, bike rent online, bike booking, two wheeler rental, bike hire, motorcycle hire, scooter hire, BookYourRide";
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="BookYourRide" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="BookYourRide" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FDB813" />
      <link rel="canonical" href={url} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": schemaType,
          "name": title,
          "description": description,
          "url": url,
          "mainEntity": {
            "@type": "Organization",
            "name": "BookYourRide",
            "url": "https://www.bookyourride.in/",
            "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "9368584334",
              "contactType": "customer service"
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
