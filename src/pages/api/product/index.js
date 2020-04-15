import _ from 'lodash';
import loadContent from 'modules/contents';

export default async (req, res) => {
  const { slug } = req.query;
  const result = await loadContent();

  if (slug) {
    const products = _.find(result, { node: 'products', slug });
    res.status(200).json({ products });
  } else {
    const products = _.filter(result, (edge) => edge.node === 'products');

    res.status(200).json({ products });
  }
};
