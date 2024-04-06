import {
  CategoriesResponse,
  ModifiedProductsResponse,
  ProductDetailsResponse,
} from '../../context/AppContext/AppContext.types';
import {
  ALL_PRODUCTS_URL,
  ERROR_FETCHING_CATEGORIES_MESSAGE,
  ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE,
  ERROR_FETCHING_PRODUCTS_MESSAGE,
  PRODUCT_CATEGORIES_URL,
} from '../constants/Constants';
import { modifyProductsData } from './ProductUtils';

export const fetchProducts = async (): Promise<ModifiedProductsResponse> => {
  try {
    const response = await fetch(ALL_PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
    const data = await response.json();
    const modifiedProductsData = modifyProductsData(data);
    return modifiedProductsData;
  } catch (error) {
    console.error(`${ERROR_FETCHING_PRODUCTS_MESSAGE}:`, error);
    return {
      error: ERROR_FETCHING_PRODUCTS_MESSAGE,
      products: [],
      priceRange: { min: 0, max: 0 },
    };
  }
};

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await fetch(PRODUCT_CATEGORIES_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }
    const data = await response.json();
    return { categories: data };
  } catch (error) {
    console.error(`${ERROR_FETCHING_CATEGORIES_MESSAGE}:`, error);
    return { error: ERROR_FETCHING_CATEGORIES_MESSAGE, categories: [] };
  }
};

export const fetchSingleProduct = async (
  productId: string,
): Promise<ProductDetailsResponse> => {
  try {
    const response = await fetch(`${ALL_PRODUCTS_URL}/${productId}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch product details. Status: ${response.status}`,
      );
    }
    const data = await response.json();
    return { productDetails: data };
  } catch (error) {
    console.error(`${ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE}:`, error);
    return {
      error: ERROR_FETCHING_PRODUCT_DETAILS_MESSAGE,
      productDetails: null,
    };
  }
};
