export type AppContextProps = {
  children: React.ReactNode;
};

export interface ProductRaw {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Product extends ProductRaw {
  viewTitle: string;
}

export interface SelectedFilters {
  viewTitle: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export enum SortOrder {
  ascending = 'asc',
  descending = 'desc',
}

export interface SelectedSorting {
  key: keyof Product | '';
  value: string;
  order: SortOrder | '';
}

export type AppState = {
  allProducts: Product[];
  loading: boolean;
  productCategories: string[];
  selectedSorting: SelectedSorting;
  selectedFilters: {
    categories: string[];
    priceRange: PriceRange;
    selectedPriceRange: number;
  };
};

export type AppContextValue = {
  appState: AppState;
  updateAppState: (payload: any) => void;
};

export type ModifiedProductsResponse = {
  products: Product[];
  priceRange: PriceRange;
  error?: string;
};
