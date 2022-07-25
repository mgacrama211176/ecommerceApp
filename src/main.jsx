import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ProductListPage from './pages/ProductListPage';
import CategoryPage from './pages/CategoryPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/product/:productId"
        element={<ProductPage header="Product Title" />}
      />
      <Route path="/" element={<ProductListPage />} />

      {/* :Segment */}
      <Route path="/categories/:category" element={<CategoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
