import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { fetchCategories, fetchProducts } from '../../helpers/utils/APIUtils';
import { useAppContext } from '../../context/AppContext/AppContext.component';
import {
  DEFAULT_SORT_OPTION,
  ERROR_FETCHING_PRODUCTS_MESSAGE,
} from '../../helpers/constants/Constants';
import Spinner from '../../components/Spinner/Spinner.component';
import { isEmpty } from '../../helpers/utils/CommonUtils';
import ProductsList from '../../components/ProductsList/ProductsList.component';
import ResultModifier from '../../components/ResultModifier/ResultModifier.component';
import { sortProducts } from '../../helpers/utils/ProductUtils';
const styles = require('./Home.module.css');

const Home: React.FC = () => {
  // ---------- Context ----------
  const { appState, updateAppState } = useAppContext();

  const {
    allProducts,
    loading,
    productCategories,
    selectedSorting,
    selectedFilters: { categories, selectedPriceRange },
  } = appState;

  // ---------- State ----------
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ---------- Lifecycle ----------
  useEffect(() => {
    const getCategories = async () => {
      try {
        const { categories, error } = await fetchCategories();

        if (!error && !isEmpty(categories)) {
          updateAppState({ productCategories: categories });
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getProducts = async () => {
      try {
        updateAppState({ loading: true });
        const { products, priceRange, error } = await fetchProducts();
        updateAppState({ loading: false });

        if (error) {
          setErrorMessage(error);
        } else {
          setErrorMessage(null);
          updateAppState({
            allProducts: products,
            selectedFilters: {
              ...appState.selectedFilters,
              priceRange,
              selectedPriceRange: priceRange.max,
            },
          });
          getCategories();
        }
      } catch (error) {
        setErrorMessage(ERROR_FETCHING_PRODUCTS_MESSAGE);
      } finally {
        updateAppState({ loading: false });
      }
    };

    getProducts();
  }, []);

  // ---------- Constants ----------
  const formattedProducts = useMemo(() => {
    if (!errorMessage) {
      let filteredProducts = allProducts.filter((product) => {
        if (categories.length) {
          return (
            categories.includes(product.category) &&
            product.price <= selectedPriceRange
          );
        } else {
          return product.price <= selectedPriceRange;
        }
      });

      if (
        selectedSorting.value !== DEFAULT_SORT_OPTION &&
        selectedSorting.key !== ''
      ) {
        filteredProducts = sortProducts(
          filteredProducts,
          selectedSorting.key,
          selectedSorting.order,
        );
      }

      return filteredProducts;
    } else {
      return [];
    }
  }, [
    allProducts,
    selectedSorting,
    categories,
    selectedPriceRange,
    errorMessage,
  ]);

  // ---------- Render ----------
  return (
    <Fragment>
      {loading ? (
        <div className={styles.fullViewContainer}>
          <Spinner />
        </div>
      ) : isEmpty(formattedProducts) && errorMessage ? (
        <div className={styles.fullViewContainer}>
          <p className={styles.errorMessage}>{errorMessage}&#x21;</p>
        </div>
      ) : (
        <div className={styles.mainContentContainer}>
          {!isEmpty(productCategories) && <ResultModifier />}
          {!isEmpty(formattedProducts) ? (
            <div className={styles.productListWrapper}>
              <ProductsList products={formattedProducts} />
            </div>
          ) : (
            <div className={styles.noProductsContainer}>
              <p className={styles.errorMessage}>No Products Found&#x21;</p>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
