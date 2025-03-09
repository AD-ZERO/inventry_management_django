# inventory_management_system.py

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from api.models import ProductModel, SupplierModel, SaleOrderModel, StockMovementModel
from api.mongo_operations import MongoDBHandler

# MongoDB Handler Instance
mongo_handler = MongoDBHandler()


# Views for CRUD operations
@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = ProductModel(**data)
            product_id = mongo_handler.save_product(product)
            return JsonResponse({"message": "Product added successfully", "product_id": str(product_id)}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def list_products(request):
    if request.method == 'GET':
        try:
            products = mongo_handler.get_products()
            for product in products:
                product["_id"] = str(product["_id"])
            return JsonResponse({"products": products}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def add_supplier(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            supplier = SupplierModel(**data)
            supplier_id = mongo_handler.save_supplier(supplier)
            return JsonResponse({"message": "Supplier added successfully", "supplier_id": str(supplier_id)}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def list_suppliers(request):
    if request.method == 'GET':
        try:
            suppliers = mongo_handler.get_suppliers()
            for supplier in suppliers:
                supplier["_id"] = str(supplier["_id"])
            return JsonResponse({"suppliers": suppliers}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def add_stock_movement(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            stock_movement = StockMovementModel(**data)
            stock_movement_id = mongo_handler.save_stock_movement(stock_movement)
            return JsonResponse(
                {"message": "Stock movement recorded successfully", "stock_movement_id": str(stock_movement_id)},
                status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def create_sale_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("hello")
            sale_order = SaleOrderModel(**data)
            print("hello2")
            sale_order_id = mongo_handler.save_sale_order(sale_order)
            print("hello3")
            return JsonResponse({"message": "Sale order created successfully", "sale_order_id": str(sale_order_id)},
                                status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def list_sale_orders(request):
    if request.method == 'GET':
        try:
            sale_orders = mongo_handler.get_sale_orders()
            for order in sale_orders:
                order["_id"] = str(order["_id"])
            return JsonResponse({"sale_orders": sale_orders}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def cancel_sale_order(request):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            sale_order_id = data["_id"]
            mongo_handler.cancel_sale_order(sale_order_id)
            return JsonResponse({"message": "Sale order canceled successfully", "sale_order_id": str(sale_order_id)},
                                status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def complete_sale_order(request):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body)
            sale_order_id = data["_id"]
            mongo_handler.complete_sale_order(sale_order_id)
            return JsonResponse({"message": "Sale order completed successfully", "sale_order_id": str(sale_order_id)},
                                status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


# Create your views here.
