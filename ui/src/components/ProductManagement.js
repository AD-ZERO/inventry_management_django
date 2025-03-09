import React, { useState, useEffect } from 'react';
import { listProducts, addProduct, createSaleOrder, addStockMovement } from '../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [saleDate, setSaleDate] = useState('');
  const [movementType, setMovementType] = useState('In');
  const [movementDate, setMovementDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await listProducts();
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, category, price, stock_quantity: stockQuantity };
    try {
      await addProduct(newProduct);
      alert('Product added successfully');
      setName('');
      setDescription('');
      setCategory('');
      setPrice('');
      setStockQuantity('');
      document.getElementById('addProductPopup').style.display = 'none';
      // Reload product list after adding a new one
      const response = await listProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleRegisterSaleOrder = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setTotalPrice(product.price);
    document.getElementById('saleOrderPopup').style.display = 'block';
  };

  const handleAddStockMovement = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setMovementType('In');
    setMovementDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    document.getElementById('stockMovementPopup').style.display = 'block';
  };

  const updateTotalPrice = (e) => {
    const qty = e.target.value;
    setQuantity(qty);
    setTotalPrice(selectedProduct.price * qty);
  };

  const handleCreateSaleOrder = async (e) => {
    e.preventDefault();
    const saleOrderData = {
      product_id: selectedProduct._id,
      quantity: parseInt(quantity),
      total_price: parseFloat(totalPrice),
      sale_date: saleDate,
    };
    try {
      await createSaleOrder(saleOrderData);
      alert('Sale order created successfully');
      document.getElementById('saleOrderPopup').style.display = 'none';
      // Reload product list after adding a new one
      const response = await listProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error creating sale order:', error);
    }
  };

  const handleCreateStockMovement = async (e) => {
    e.preventDefault();
    const stockMovementData = {
      product_id: selectedProduct._id,
      quantity: parseInt(quantity),
      movement_type: movementType,
      movement_date: movementDate,
      notes: notes,
    };
    try {
      await addStockMovement(stockMovementData);
      alert('Stock movement recorded successfully');
      document.getElementById('stockMovementPopup').style.display = 'none';
      // Reload product list after adding a new one
      const response = await listProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error recording stock movement:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}>
        <h3>Product Management</h3>
        <button onClick={() => document.getElementById('addProductPopup').style.display = 'block'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Add Product</button>
      </div>
      
      <h4>Product List</h4>
      <input
        type="text"
        placeholder="Filter by category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <ul>
        {products
          .filter((product) => categoryFilter === '' || product.category.includes(categoryFilter))
          .map((product) => (
            <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Name: {product.name} - Category: {product.category} - Price: {product.price} - Stock_quantity: {product.stock_quantity}</span>
              <div>
                <button onClick={() => handleRegisterSaleOrder(product)} style={{ marginLeft: '10px' }}>Register Sale Order</button>
                <button onClick={() => handleAddStockMovement(product)} style={{ marginLeft: '10px' }}>Add Stock Movement</button>
              </div>
            </li>
          ))}
      </ul>


      <div id="addProductPopup" style={{ display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h4>Add New Product</h4>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="number" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Add Product</button>
          <button type="button" onClick={() => document.getElementById('addProductPopup').style.display = 'none'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
        </form>
      </div>

      <div id="saleOrderPopup" style={{ display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h4>Register Sale Order</h4>
        <form onSubmit={handleCreateSaleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="hidden" id="productId" value={selectedProduct?._id || ''} />
          <div>
            <label>Product Name: </label>
            <span id="productName">{selectedProduct?.name || ''}</span>
          </div>
          <div>
            <label>Category: </label>
            <span id="productCategory">{selectedProduct?.category || ''}</span>
          </div>
          <div>
            <label>Price: </label>
            <span id="productPrice">{selectedProduct?.price || ''}</span>
          </div>
          <div>
            <label>Quantity: </label>
            <input type="number" id="quantity" min="1" value={quantity} required onChange={updateTotalPrice} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label>Total Price: </label>
            <span id="totalPrice">{totalPrice}</span>
          </div>
          <div>
            <label>Sale Date: </label>
            <input type="date" id="saleDate" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Submit</button>
          <button type="button" onClick={() => document.getElementById('saleOrderPopup').style.display = 'none'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
        </form>
      </div>

      <div id="stockMovementPopup" style={{ display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h4>Add Stock Movement</h4>
        <form onSubmit={handleCreateStockMovement} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="hidden" id="productId" value={selectedProduct?._id || ''} />
          <div>
            <label>Product Name: </label>
            <span id="productName">{selectedProduct?.name || ''}</span>
          </div>
          <div>
            <label>Category: </label>
            <span id="productCategory">{selectedProduct?.category || ''}</span>
          </div>
          <div>
            <label>Quantity: </label>
            <input type="number" id="quantity" min="1" value={quantity} required onChange={(e) => setQuantity(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label>Movement Type: </label>
            <select id="movementType" value={movementType} onChange={(e) => setMovementType(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="In">In</option>
              <option value="Out">Out</option>
            </select>
          </div>
          <div>
            <label>Movement Date: </label>
            <input type="date" id="movementDate" value={movementDate} onChange={(e) => setMovementDate(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div>
            <label>Notes: </label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength="300" required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Submit</button>
          <button type="button" onClick={() => document.getElementById('stockMovementPopup').style.display = 'none'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
