import {
  Product,
  SelectedSorting,
  SortOrder,
} from '../../context/AppContext/AppContext.types';

export const ALL_PRODUCTS_URL = 'https://fakestoreapi.com/products';

export const PRODUCT_CATEGORIES_URL =
  'https://fakestoreapi.com/products/categories';

export const SOMETHING_WENT_WRONG_MESSAGE = 'Something went wrong';

export const ERROR_FETCHING_PRODUCTS_MESSAGE = 'Error fetching products';

export const ERROR_FETCHING_CATEGORIES_MESSAGE = 'Error fetching categories';

export const ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE =
  'Error fetching product details';

export const HOME_PAGE_HEADING = 'Product Catalog Display';

export const PRODUCT_TITLE_MAX_VIEW_LENGTH = 65;

export const CURRENCY_SYMBOL = '$';

export const DEFAULT_SORT_OPTION = 'Relevance';

export const SORTING_KEYS: Record<string, keyof Product> = {
  title: 'title',
  price: 'price',
};

export const SORT_BY_OPTIONS: SelectedSorting[] = [
  { key: '', value: DEFAULT_SORT_OPTION, order: '' },
  {
    key: SORTING_KEYS.price,
    value: 'Price - Low to High',
    order: SortOrder.ascending,
  },
  {
    key: SORTING_KEYS.price,
    value: 'Price - High to Low',
    order: SortOrder.descending,
  },
  {
    key: SORTING_KEYS.title,
    value: 'Name - Ascending',
    order: SortOrder.ascending,
  },
  {
    key: SORTING_KEYS.title,
    value: 'Name - Descending',
    order: SortOrder.descending,
  },
];

export const PAGINATION_FIXED_FIRST_PAGE = 1;
export const PAGINATION_FIXED_LAST_PAGE = 4;
