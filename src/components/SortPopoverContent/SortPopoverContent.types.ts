import { SelectedSorting } from '../../context/AppContext/AppContext.types';

export type SortPopoverContentProps = {
  selectedSortOption: SelectedSorting;
  onClick: (selectedSortOption: SelectedSorting) => void;
};
