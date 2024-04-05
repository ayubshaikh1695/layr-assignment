import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home/Home.component';
import ProductDetails from '../ProductDetails/ProductDetails.component';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'product/:productId',
    element: <ProductDetails />,
  },
]);

const RoutesWrapper: React.FC = () => <RouterProvider router={router} />;

export default RoutesWrapper;
