import { PriceRange } from '../../context/AppContext/AppContext.types';
import { FilterDetails } from '../ResultModifier/ResultModifier.types';

export type FilterPopoverContentProps = {
  productCategories: string[];
  priceRange: PriceRange;
  selectedProductCategories: string[];
  selectedPriceRange: number;
  onApplyFilterClick: (filterDetails: FilterDetails) => void;
};
