import React, { memo, useState } from 'react';
import { FilterDetails } from './ResultModifier.types';
import { HOME_PAGE_HEADING } from '../../helpers/constants/Constants';
import PopoverComponent from '../Popover/Popover.component';
import SortPopoverContent from '../SortPopoverContent/SortPopoverContent.component';
import FilterPopoverContent from '../FilterPopoverContent/FilterPopoverContent.component';
import { useAppContext } from '../../context/AppContext/AppContext.component';
import { SelectedSorting } from '../../context/AppContext/AppContext.types';
const styles = require('./ResultModifier.module.css');

const ResultModifier = () => {
  // ---------- Context ----------
  const { appState, updateAppState } = useAppContext();
  const {
    productCategories,
    selectedSorting,
    selectedFilters: { categories, priceRange, selectedPriceRange },
  } = appState;

  // ---------- State ----------
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [showFilterPopover, setShowFilterPopover] = useState(false);

  // ---------- Methods ----------
  const toggleSortPopover = () => {
    setShowSortPopover(!showSortPopover);
  };

  const toggleFilterPopover = () => {
    setShowFilterPopover(!showFilterPopover);
  };

  const handleApplyFilter = (filterDetails: FilterDetails) => {
    const { selectedCategories, selectedPriceRange } = filterDetails;
    updateAppState({
      selectedFilters: {
        ...appState.selectedFilters,
        categories: selectedCategories,
        selectedPriceRange,
      },
    });
    toggleFilterPopover();
  };

  const handleSortOptionClick = (selectedSortOption: SelectedSorting) => {
    if (selectedSortOption.value !== selectedSorting.value) {
      updateAppState({
        selectedSorting: selectedSortOption,
      });
      toggleSortPopover();
    }
  };

  // ---------- Render ----------
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{HOME_PAGE_HEADING}</h2>
      <div className={styles.modifiersContainer}>
        <div className={styles.buttonContainer}>
          <button onClick={toggleSortPopover}>
            Sort by:&nbsp;{selectedSorting.value}&nbsp;&#x21f3;
          </button>
          {showSortPopover && (
            <PopoverComponent onClose={toggleSortPopover}>
              <SortPopoverContent
                selectedSortOption={selectedSorting}
                onClick={handleSortOptionClick}
              />
            </PopoverComponent>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={toggleFilterPopover}>Filter&nbsp;&#x2702;</button>
          {showFilterPopover && (
            <PopoverComponent onClose={toggleFilterPopover}>
              <FilterPopoverContent
                productCategories={productCategories}
                priceRange={priceRange}
                selectedProductCategories={categories}
                selectedPriceRange={selectedPriceRange}
                onApplyFilterClick={handleApplyFilter}
              />
            </PopoverComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ResultModifier);
