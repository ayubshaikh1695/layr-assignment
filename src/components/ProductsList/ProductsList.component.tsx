import React, { memo, useRef, useEffect, Fragment, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard.component';
import { ProductsListProps } from './ProductsList.types';
import { useAppContext } from '../../context/AppContext/AppContext.component';
import Spinner from '../Spinner/Spinner.component';
import { isEmpty } from '../../helpers/utils/CommonUtils';
import { DEFAULT_SORT_OPTION } from '../../helpers/constants/Constants';
const styles = require('./ProductsList.module.css');

const ProductsList = (props: ProductsListProps) => {
  // ---------- Props ----------
  const { products } = props;

  // ---------- Context ----------
  const { appState, updateAppState } = useAppContext();
  const {
    selectedSorting,
    selectedFilters: { categories, priceRange, selectedPriceRange },
    pagination,
  } = appState;

  // ---------- State ----------
  const [loading, setLoading] = useState(false);

  // ---------- Ref ----------
  const listEndObserverRef = useRef<HTMLDivElement>(null);

  // ---------- Lifecycle ----------
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          handleScrollToListEnd();
        }
      });
    }, options);

    if (listEndObserverRef.current) {
      observer.observe(listEndObserverRef.current);
    }

    return () => {
      if (listEndObserverRef.current) {
        observer.unobserve(listEndObserverRef.current);
      }
    };
  }, [
    products,
    selectedSorting,
    categories,
    priceRange,
    selectedPriceRange,
    pagination,
  ]);

  // ---------- Methods ----------
  // This method does not make any additional API call to get new products because of no such support by the API provider.
  // I'm conditionally slicing the first 20 products from the already fetched products and pushing them to the
  // AppContext state to mock infinite scroll and new products addition to the list. Also, I've limited this to three times and
  // disabled this behavior if any sorting or filters are applied as there could be limited products visible on the screen if
  // any sorting or filters are applied and they may trigger the intersection observer as the div would be intersection on the view already.
  const handleScrollToListEnd = () => {
    if (
      pagination.currentPage < pagination.lastPage &&
      selectedSorting.value === DEFAULT_SORT_OPTION &&
      isEmpty(categories) &&
      selectedPriceRange === priceRange.max
    ) {
      setLoading(true);
      setTimeout(() => {
        const extractedProducts = products.slice(0, 20);
        updateAppState({
          allProducts: [...products, ...extractedProducts],
          pagination: {
            ...pagination,
            currentPage: pagination.currentPage + 1,
          },
        });
        setLoading(false);
      }, 300);
    }
  };

  // ---------- Render ----------
  return (
    <Fragment>
      <ul className={styles.productsGrid}>
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div
        ref={listEndObserverRef}
        className={styles.intersectionObserverDiv}
      />
      {loading && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {pagination.currentPage === pagination.lastPage && (
        <p className={styles.resultsEndText}>No more results</p>
      )}
    </Fragment>
  );
};

export default memo(ProductsList);
