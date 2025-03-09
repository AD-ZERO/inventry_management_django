

# Inventory Management System


## Features
- CRUD operations for Products, Suppliers, and Sales Orders.
- Stock movement tracking with validation.
- Status updates for sales orders (Pending, Completed, Cancelled).
- User-friendly API endpoints for integration.

## Tech Stack
- Backend: Django
- Database: MongoDB
- Frontend: HTML, CSS, JavaScript (optional for UI).

## Prerequisites
- Docker and Docker Compose installed on your system.
- Basic knowledge of Python and Django.

## Setup Instructions

1. Build and start the application:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - API: [http://localhost:8000](http://localhost:8000)
   - MongoDB: [localhost:27017](localhost:27017)


---

## Endpoints

- `POST /products/add/` - Add a new product.
- `GET /products/` - List all products.
- `POST /suppliers/add/` - Add a new supplier.
- `GET /suppliers/` - List all suppliers.
- `POST /stock_movement/add/` - Add stock movement.
- `GET /sale_orders/` - List all sale orders.
- `POST /sale_orders/create/` - Create a new sale order.
- `PATCH /sale_orders/cancel/` - Cancel a sale order.
- `PATCH /sale_orders/complete/` - Complete a sale order.

Here are the updated `curl` requests example:

### 1. **Add Product**
```bash
curl -X POST http://localhost:8000/products/add/ \
-H "Content-Type: application/json" \
-d '{
  "name": "Product 1", 
  "description": "Description of Product 1", 
  "category": "Category A", 
  "price": 100.0, 
  "stock_quantity": 50
}'
```

### 2. **List Products**
```bash
curl -X GET http://localhost:8000/products/
```

### 3. **Add Supplier**
```bash
curl -X POST http://localhost:8000/suppliers/add/ \
-H "Content-Type: application/json" \
-d '{
  "name": "Supplier 1", 
  "email": "supplier1@example.com", 
  "phone": "1234567890", 
  "address": "123 Supplier Street, City, Country"
}'
```

### 4. **List Suppliers**
```bash
curl -X GET http://localhost:8000/suppliers/
```

### 5. **Add Stock Movement**
```bash
curl -X POST http://localhost:8000/stock_movement/add/ \
-H "Content-Type: application/json" \
-d '{
  "product_id": "product_id_123", 
  "quantity": 50, 
  "movement_type": "In", 
  "movement_date": "2025-01-12", 
  "notes": "Stock replenishment"
}'
```

### 6. **Create Sale Order**
```bash
curl -X POST http://localhost:8000/sale_orders/create/ \
-H "Content-Type: application/json" \
-d '{
  "product_id": "product_id_123", 
  "quantity": 2, 
  "total_price": 200.0, 
  "sale_date": "2025-01-12", 
  "status": "Pending"
}'
```

### 7. **List Sale Orders**
```bash
curl -X GET http://localhost:8000/sale_orders/
```

### 8. **Cancel Sale Order**
```bash
curl -X PATCH http://localhost:8000/sale_orders/cancel/ \
-H "Content-Type: application/json" \
-d '{"_id": "sale_order_id_123"}'
```

### 9. **Complete Sale Order**
```bash
curl -X PATCH http://localhost:8000/sale_orders/complete/ \
-H "Content-Type: application/json" \
-d '{"_id": "sale_order_id_123"}'
```

# Inventory Management UI

This is the user interface for interacting with the Inventory Management API.

## Installation and Run

To install the necessary dependencies, run:

```bash
cd ui
npm install
npm start
```
## Development
- To install additional dependencies, update `requirements.txt` and rebuild the Docker image.
- Use `docker-compose exec web bash` to open a shell in the Django container.

