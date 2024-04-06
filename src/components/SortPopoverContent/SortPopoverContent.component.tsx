import React from 'react';
import { SortPopoverContentProps } from './SortPopoverContent.types';
import { SORT_BY_OPTIONS } from '../../helpers/constants/Constants';
const styles = require('./SortPopoverContent.module.css');

const SortPopoverContent = (props: SortPopoverContentProps) => {
  const { selectedSortOption, onClick } = props;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Sort By:</p>
      <ul>
        {SORT_BY_OPTIONS.map((option, index) => (
          <li
            key={`${option.value}-${index}`}
            className={`${styles.sortOption} ${selectedSortOption.value === option.value ? styles.selectedOption : ''}`}
            onClick={() => {
              onClick(option);
            }}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortPopoverContent;
