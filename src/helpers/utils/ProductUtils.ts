import {
  ModifiedProductsResponse,
  Product,
  ProductRaw,
  SortOrder,
} from '../../context/AppContext/AppContext.types';
import { PRODUCT_TITLE_MAX_VIEW_LENGTH } from '../constants/Constants';
import { truncateWithEllipsis } from './CommonUtils';

export const modifyProductsData = (
  products: ProductRaw[],
): ModifiedProductsResponse => {
  const modifiedProductsData: ModifiedProductsResponse = {
    products: [],
    priceRange: { min: 0, max: 0 },
  };

  products.forEach((product, index) => {
    if (index === 0) {
      modifiedProductsData.priceRange.min = product.price;
      modifiedProductsData.priceRange.max = product.price;
    } else {
      if (product.price < modifiedProductsData.priceRange.min) {
        modifiedProductsData.priceRange.min = product.price;
      }
      if (product.price > modifiedProductsData.priceRange.max) {
        modifiedProductsData.priceRange.max = product.price;
      }
    }

    const modifiedProduct = {
      ...product,
      viewTitle: truncateWithEllipsis(
        product.title,
        PRODUCT_TITLE_MAX_VIEW_LENGTH,
      ),
    };

    modifiedProductsData.products.push(modifiedProduct);
  });

  return modifiedProductsData;
};

export const sortProducts = (
  products: Product[],
  sortBy: keyof Product,
  sortOrder: string,
): Product[] => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === SortOrder.ascending) {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });
  return sortedProducts;
};
