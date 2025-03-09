import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/', // Replace with your Django backend URL
});

export const addProduct = (productData) => api.post('products/add/', productData);
export const listProducts = () => api.get('products/');
export const addSupplier = (supplierData) => api.post('suppliers/add/', supplierData);
export const listSuppliers = () => api.get('suppliers/');
export const addStockMovement = (movementData) => api.post('stock_movement/add/', movementData);
export const listSaleOrders = () => api.get('sale_orders/');
export const createSaleOrder = (saleOrderData) => api.post('sale_orders/create/', saleOrderData);
export const cancelSaleOrder = (id) => api.patch(`sale_orders/cancel/`, { _id: id });
export const completeSaleOrder = (id) => api.patch(`sale_orders/complete/`, { _id: id });
