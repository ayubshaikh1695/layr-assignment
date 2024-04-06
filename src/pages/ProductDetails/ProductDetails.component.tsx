import React, { Fragment, useEffect, useState } from 'react';
import { ProductRaw } from '../../context/AppContext/AppContext.types';
import { fetchSingleProduct } from '../../helpers/utils/APIUtils';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE,
  SOMETHING_WENT_WRONG_MESSAGE,
} from '../../helpers/constants/Constants';
import Spinner from '../../components/Spinner/Spinner.component';
import { isEmpty } from '../../helpers/utils/CommonUtils';
const styles = require('./ProductDetails.module.css');

const ProductDetails = () => {
  // ---------- hooks ----------
  const navigate = useNavigate();
  const params = useParams();

  const { productId } = params;

  // ---------- State ----------
  const [productDetails, setProductDetails] = useState<ProductRaw | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ---------- Lifecycle ----------
  useEffect(() => {
    if (productId?.length) {
      const getProductDetails = async () => {
        try {
          setLoading(true);
          const { productDetails, error } = await fetchSingleProduct(productId);
          setLoading(false);

          if (error) {
            setErrorMessage(error);
          } else {
            setProductDetails(productDetails);
          }
        } catch (error) {
          setErrorMessage(ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE);
        } finally {
          setLoading(false);
        }
      };

      getProductDetails();
    } else {
      setErrorMessage(SOMETHING_WENT_WRONG_MESSAGE);
    }
  }, []);

  // ---------- Methods ----------
  const handleBackButton = () => {
    navigate('/');
  };

  // ---------- Render ----------
  return (
    <Fragment>
      {loading ? (
        <div className={styles.fullViewContainer}>
          <Spinner />
        </div>
      ) : isEmpty(productDetails) && errorMessage ? (
        <div className={styles.fullViewContainer}>
          <p className={styles.errorMessage}>{errorMessage}&#x21;</p>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.mainContentContainer}>
            <div>
              <button
                className={styles.goBackButton}
                onClick={handleBackButton}
              >
                &#x21e6;&nbsp;Back to Catalog
              </button>
            </div>
            <div className={styles.product}>
              <div className={styles.imageContainer}>
                <img
                  src={productDetails?.image}
                  alt={productDetails?.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.details}>
                <h2>{productDetails?.title}</h2>
                <p className={styles.description}>
                  {productDetails?.description}
                </p>
                <div className={styles.reviews}>
                  <h3>Reviews:</h3>
                  <p>
                    {productDetails?.rating.rate} out of 5 stars (
                    {productDetails?.rating.count} reviews)
                  </p>
                </div>
                <div className={styles.price}>
                  <h3>Price:</h3>
                  <p>${productDetails?.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
