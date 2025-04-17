import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Component that updates meta tags based on current route
 */
export function DynamicMeta() {
  const location = useLocation();
  
  // Page-specific meta based on current route
  const metaConfig = {
    '/': {
      title: 'Vertical Shortcut | Master Short-Form Content',
      description: 'The premium 10-week program for founders and creators to generate consistent leads and revenue with short-form video.'
    },
    '/application-form': {
      title: 'Apply Now | Vertical Shortcut',
      description: 'Take the first step to mastering short-form content. Apply for the Vertical Shortcut program today.'
    }
    // Add route-specific meta for each page
  };
  
  const currentMeta = metaConfig[location.pathname] || metaConfig['/'];
  
  return (
    <Helmet>
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      <meta property="og:title" content={currentMeta.title} />
      <meta property="og:description" content={currentMeta.description} />
      <meta name="twitter:title" content={currentMeta.title} />
      <meta name="twitter:description" content={currentMeta.description} />
    </Helmet>
  );
}

export default DynamicMeta; 