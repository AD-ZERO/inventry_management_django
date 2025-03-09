# mongo_operations.py
import os

from pymongo import MongoClient
from bson.objectid import ObjectId
from api.models import ProductModel, SupplierModel, SaleOrderModel, StockMovementModel

MONGO_URI=os.getenv("MONGO_URI","mongodb://localhost:27017/")
class MongoDBHandler:
    def __init__(self, uri=MONGO_URI, db_name="inventory_management"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.products = self.db['products']
        self.suppliers = self.db['suppliers']
        self.sale_orders = self.db['sale_orders']
        self.stock_movements = self.db['stock_movements']

    def save_product(self, product: ProductModel):
        if self.products.find_one({"name": product.name}):
            raise ValueError("Product with this name already exists")
        return self.products.insert_one(product.model_dump()).inserted_id

    def get_products(self):
        return list(self.products.find())

    def save_supplier(self, supplier: SupplierModel):
        if self.suppliers.find_one({"email": supplier.email}):
            raise ValueError("Supplier with this email already exists")
        return self.suppliers.insert_one(supplier.model_dump()).inserted_id

    def get_suppliers(self):
        return list(self.suppliers.find())

    def save_stock_movement(self, stock_movement: StockMovementModel):
        product = self.products.find_one({"_id": ObjectId(stock_movement.product_id)})
        if not product:
            raise ValueError("Product not found")

        new_quantity = (product['stock_quantity'] + stock_movement.quantity
                        if stock_movement.movement_type == "In"
                        else product['stock_quantity'] - stock_movement.quantity)

        if new_quantity < 0:
            raise ValueError("Insufficient stock")

        self.products.update_one({"_id": ObjectId(stock_movement.product_id)},
                                  {"$set": {"stock_quantity": new_quantity}})
        return self.stock_movements.insert_one(stock_movement.model_dump()).inserted_id

    def save_sale_order(self, sale_order: SaleOrderModel):
        product = self.products.find_one({"_id": ObjectId(sale_order.product_id)})
        if not product:
            raise ValueError("Product not found")

        if product['stock_quantity'] < sale_order.quantity:
            raise ValueError("Insufficient stock")

        total_price = product['price'] * sale_order.quantity
        sale_order.total_price = total_price

        self.products.update_one({"_id": ObjectId(sale_order.product_id)},
                                  {"$inc": {"stock_quantity": - sale_order.quantity}})
        return self.sale_orders.insert_one(sale_order.model_dump()).inserted_id

    def cancel_sale_order(self, sale_order_id: str):
        sale_order = self.sale_orders.find_one({"_id": ObjectId(sale_order_id)})
        if not sale_order:
            raise ValueError("Order not found")

        self.products.update_one({"_id": ObjectId(sale_order["product_id"])},
                                 {"$inc": {"stock_quantity": sale_order["quantity"]}})
        self.sale_orders.update_one({"_id": ObjectId(sale_order_id)},
                                    {"$set": {"status": "Cancelled"}})

    def complete_sale_order(self, sale_order_id: str):
        sale_order = self.sale_orders.find_one({"_id": ObjectId(sale_order_id)})
        if not sale_order:
            raise ValueError("Order not found")

        self.sale_orders.update_one({"_id": ObjectId(sale_order_id)},
                                    {"$set": {"status": "Completed"}})


    def get_sale_orders(self):
        return list(self.sale_orders.find())
