import React, { ChangeEvent, memo, useState } from 'react';
import { FilterPopoverContentProps } from './FilterPopoverContent.types';
import { CURRENCY_SYMBOL } from '../../helpers/constants/Constants';
const styles = require('./FilterPopoverContent.module.css');

const FilterPopoverContent = (props: FilterPopoverContentProps) => {
  // ---------- Props ----------
  const {
    productCategories,
    priceRange: { min, max },
    selectedProductCategories,
    selectedPriceRange,
    onApplyFilterClick,
  } = props;

  // ---------- State ----------
  const [categories, setCategories] = useState(selectedProductCategories);
  const [priceRange, setPriceRange] = useState(selectedPriceRange);

  // ---------- Methods ----------
  const handleProductCategoryChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked, value } = event.target;
    let newCategories = [...categories];

    if (checked) {
      newCategories.push(value);
    } else {
      newCategories = newCategories.filter((category) => category !== value);
    }

    setCategories(newCategories);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPriceRange(parseFloat(event.target.value));
  };

  const handleApplyFilter = () => {
    onApplyFilterClick({
      selectedCategories: categories,
      selectedPriceRange: priceRange,
    });
  };

  // ---------- Render ----------
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Categories:</p>
        <ul>
          {productCategories.map((category, index) => (
            <li
              key={`${category}-${index}`}
              className={styles.productCategoryLi}
            >
              <input
                type="checkbox"
                checked={categories.includes(category)}
                value={category}
                onChange={handleProductCategoryChange}
              />
              &nbsp;{category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <label htmlFor="maxPrice" className={styles.sectionLabel}>
          Price Range: {priceRange}
        </label>
        <div>
          <input
            className={styles.priceRangeInput}
            type="range"
            id="maxPrice"
            min={min}
            max={max}
            step={(max - min) / 10}
            value={priceRange}
            onChange={handlePriceChange}
          />
          <div className={styles.priceRangeScaleContainer}>
            <span>{`Min: ${CURRENCY_SYMBOL}${min}`}</span>
            <span>{`Max: ${CURRENCY_SYMBOL}${max}`}</span>
          </div>
        </div>
      </div>
      <button className={styles.applyFilterButton} onClick={handleApplyFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default memo(FilterPopoverContent);
