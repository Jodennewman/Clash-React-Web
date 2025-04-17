import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/**
 * Component that manages canonical URLs based on current route
 */
export function CanonicalUrl() {
  const { pathname } = useLocation();
  const baseUrl = 'https://verticalshortcut.com';
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}

export default CanonicalUrl; 