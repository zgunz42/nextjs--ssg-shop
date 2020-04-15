import LayoutFooter from 'modules/components/LayoutFooter';
import React from 'react';

function AppFooter() {
  return (
    <LayoutFooter
      items={[
        {
          to: '/sell/',
          label: 'Sell',
        },
        {
          to: '/affiliates/',
          label: 'Affiliates',
        },
        {
          to: '/terms/',
          label: 'Terms',
        },
        {
          to: '/privacy/',
          label: 'Privacy',
        },
        {
          to: '/collections/',
          label: 'Collections',
        },
        {
          to: 'https://material-ui.zendesk.com/hc/en-us',
          label: 'Help',
          target: '_blank',
        },
      ]}
    />
  );
}

export default React.memo(AppFooter);
