import { ModifiedProductsResponse } from '../../context/AppContext/AppContext.types';
import {
  ALL_PRODUCTS_URL,
  ERROR_FETCHING_CATEGORIES_MESSAGE,
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

export const fetchCategories = async (): Promise<any> => {
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
