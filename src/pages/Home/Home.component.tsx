import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { fetchCategories, fetchProducts } from '../../helpers/utils/APIUtils';
import { useAppContext } from '../../context/AppContext/AppContext.component';
import {
  DEFAULT_SORT_OPTION,
  SOMETHING_WENT_WRONG_MESSAGE,
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
    if (isEmpty(allProducts) || isEmpty(productCategories)) {
      const initializeState = async () => {
        try {
          updateAppState({ loading: true });
          const productsRes = await fetchProducts();
          const categoriesRes = await fetchCategories();
          updateAppState({ loading: false });

          const errorMsg = productsRes.error || categoriesRes.error;
          if (errorMsg) {
            setErrorMessage(errorMsg);
          } else {
            setErrorMessage(null);
            updateAppState({
              allProducts: productsRes.products,
              productCategories: categoriesRes.categories,
              selectedFilters: {
                ...appState.selectedFilters,
                priceRange: productsRes.priceRange,
                selectedPriceRange: productsRes.priceRange.max,
              },
            });
          }
        } catch (error) {
          setErrorMessage(SOMETHING_WENT_WRONG_MESSAGE);
        }
      };

      initializeState();
    }
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
