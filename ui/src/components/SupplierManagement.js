import React, { useState, useEffect } from 'react';
import { listSuppliers, addSupplier } from '../services/api';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await listSuppliers();
        setSuppliers(response.data.suppliers);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    const newSupplier = { name, email, phone, address };
    try {
      await addSupplier(newSupplier);
      alert('Supplier added successfully');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      // Reload supplier list after adding a new one
      const response = await listSuppliers();
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px' }}>
        <h3>Supplier Management</h3>
        <button onClick={() => document.getElementById('addSupplierPopup').style.display = 'block'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Add Supplier</button>
      </div>

      <h4>Supplier List</h4>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.email} - {supplier.phone} - {supplier.address}
          </li>
        ))}
      </ul>

      <div id="addSupplierPopup" style={{ display: 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h4>Add New Supplier</h4>
        <form onSubmit={handleAddSupplier} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Add Supplier</button>
          <button type="button" onClick={() => document.getElementById('addSupplierPopup').style.display = 'none'} style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SupplierManagement;
