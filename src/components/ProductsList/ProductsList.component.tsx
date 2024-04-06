import React, { memo } from 'react';
import ProductCard from '../ProductCard/ProductCard.component';
import { ProductsListProps } from './ProductsList.types';
const styles = require('./ProductsList.module.css');

const ProductsList = (props: ProductsListProps) => {
  const { products } = props;

  return (
    <ul className={styles.productsGrid}>
      {products.map((product, index) => (
        <li key={`${product.id}-${index}`}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default memo(ProductsList);
