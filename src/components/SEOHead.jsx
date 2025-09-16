import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords = "", 
  url, 
  image = "https://www.bookyourride.in/images/bike-rent-logo-2.png",
  type = "website",
  schemaType = "WebPage",
  robots = "index, follow"
}) => {

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="language" content="English" />
      <meta name="author" content="BookYourRide" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/images/bike-rent-logo-2.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/bike-rent-logo-2.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/bike-rent-logo-2.png" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BookYourRide" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@BookYourRide" />
      <meta name="twitter:creator" content="@BookYourRide" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FDB813" />
      <meta name="msapplication-TileColor" content="#FDB813" />
      <meta name="msapplication-TileImage" content="/images/bike-rent-logo-2.png" />
      
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
            "alternateName": "BookyourRide",
            "url": "https://www.bookyourride.in/",
            "logo": "https://www.bookyourride.in/images/bike-rent-logo-2.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "9368584334",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/BookYourRide",
              "https://www.instagram.com/BookYourRide",
              "https://www.twitter.com/BookYourRide"
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
