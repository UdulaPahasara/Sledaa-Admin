import React from 'react';
import { Helmet } from 'react-helmet-async';

const AdminSEO = ({ title }) => {
  return (
    <Helmet>
      {/* Title for Admin tab navigation */}
      <title>{title ? `${title} | SLEDAA Admin` : 'SLEDAA Admin'}</title>
      
      {/* CRITICAL: Explicitly tell all search engines NOT to index or follow links on the admin site */}
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );
};

export default AdminSEO;