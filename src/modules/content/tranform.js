import slugify from 'slugify';
import _ from 'lodash';

export const injector = {
  'slug-injector': ({ parent }) => (parent.slug ? parent.slug : slugify(parent.name, {
    replacement: '-', // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
  })),
  'price-injector': ({ parent }) => {
    const priceVariant = _.get(parent, 'variations');
    const formatter = new Intl.NumberFormat('id-ID', { currency: 'IDR', style: 'currency' });
    if (priceVariant) {
      const options = _.flatten(_.map(priceVariant, (v) => _.get(v, 'options')));
      const lowToHightPrice = _.sortBy(options, (option) => option.price);
      const prices = lowToHightPrice.map((v) => formatter.format(v.price));

      return `${_.first(prices)} - ${_.last(prices)}`;
    }
    return formatter.format(parent.price);
  },
};

export const modifier = {
  'date-modifier': ({ data }) => (_.isDate(data) ? data.toISOString() : data),
};
