export type AppContextProps = {
  children: React.ReactNode;
};

export interface Product {
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

export type AppState = {
  allProducts: Product[];
  loading: boolean;
};

export type AppContextValue = {
  appState: AppState;
  updateAppState: (payload: any) => void;
};
