import React, { useState, useEffect } from 'react';
import { listSaleOrders, cancelSaleOrder, completeSaleOrder } from '../services/api';

const ManageSaleOrders = () => {
  const [saleOrders, setSaleOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchSaleOrders = async () => {
      try {
        const response = await listSaleOrders();
        setSaleOrders(response.data.sale_orders);
      } catch (error) {
        console.error('Error fetching sale orders:', error);
      }
    };
    fetchSaleOrders();
  }, []);

  const handleCancelOrder = async (id) => {
    try {
      await cancelSaleOrder(id);
      alert('Sale order cancelled successfully');
      // Reload sale order list after cancelling
      const response = await listSaleOrders();
      setSaleOrders(response.data.sale_orders);
    } catch (error) {
      console.error('Error cancelling sale order:', error);
    }
  };

  const handleCompleteOrder = async (id) => {
    try {
      await completeSaleOrder(id);
      alert('Sale order completed successfully');
      // Reload sale order list after completing
      const response = await listSaleOrders();
      setSaleOrders(response.data.sale_orders);
    } catch (error) {
      console.error('Error completing sale order:', error);
    }
  };

  return (
    <div>
      <h3>Manage Sale Orders</h3>
      <input
        type="text"
        placeholder="Filter by status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      />
      <ul>
        {saleOrders
          .filter((order) => statusFilter === '' || order.status.includes(statusFilter))
          .map((order) => (
            <li key={order._id}>
              Product ID: {order.product_id} - Quantity: {order.quantity} - Total Price: {order.total_price} - Sale Date: {order.sale_date} - Status: {order.status}
              {order.status === 'Pending' && (
                <>
                  <button style={{ marginLeft: '10px' }} onClick={() => handleCompleteOrder(order._id)}>Complete</button>
                  <button onClick={() => handleCancelOrder(order._id)}>Cancel</button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ManageSaleOrders;
