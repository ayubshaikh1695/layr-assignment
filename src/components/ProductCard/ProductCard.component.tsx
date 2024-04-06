import React, { memo } from 'react';
import { ProductCardProps } from './ProductCard.types';
import { useNavigate } from 'react-router-dom';
const styles = require('./ProductCard.module.css');

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  const navigate = useNavigate();

  const handleViewDetails = (productId: number) => {
    navigate(`product/${productId}`);
  };

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
        <button
          className={styles.viewDetailsButton}
          onClick={() => {
            handleViewDetails(product.id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default memo(ProductCard);
