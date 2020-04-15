import loadContent, { injector, modifier } from 'modules/content';

// eslint-disable-next-line camelcase
const content_loaded = {};

export default async function () {
  if (!content_loaded.data) {
    content_loaded.data = await loadContent('contents', [
      {
        name: 'products',
        mapDataInjector: {
          // id: 'id-injector',
          slug: 'slug-injector',
          priceStr: 'price-injector',
        },
        mapDataModifier: {
          date_created: 'date-modifier',
          date_modified: 'date-modifier',
        },
      },
      {
        name: 'promotions',
        mapDataInjector: {
          // id: 'id-injector',
          slug: 'slug-injector',
        },
        mapDataModifier: {
          date_begin: 'date-modifier',
          date_end: 'date-modifier',
        },
      },
      'settings',
    ], injector, modifier);
  }

  return content_loaded.data;
}
