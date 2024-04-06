import React, { memo } from 'react';
import { ProductCardProps } from './ProductCard.types';
const styles = require('./ProductCard.module.css');

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.cardBottom}>
        <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>{product.viewTitle}</h3>
          <p className={styles.productPrice}>${product.price}</p>
        </div>
        <button className={styles.viewDetailsButton}>View Details</button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
