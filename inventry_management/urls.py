"""
URL configuration for inventry_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from api import views

urlpatterns = [
    # Product related URLs
    path('products/', views.list_products, name='list_products'),
    path('products/add/', views.add_product, name='add_product'),

    # Supplier related URLs
    path('suppliers/', views.list_suppliers, name='list_suppliers'),
    path('suppliers/add/', views.add_supplier, name='add_supplier'),

    # Stock movement related URL
    path('stock_movement/add/', views.add_stock_movement, name='add_stock_movement'),

    # Sale order related URLs
    path('sale_orders/', views.list_sale_orders, name='list_sale_orders'),
    path('sale_orders/create/', views.create_sale_order, name='create_sale_order'),
    path('sale_orders/cancel/', views.cancel_sale_order, name='cancel_sale_order'),
    path('sale_orders/complete/', views.complete_sale_order, name='complete_sale_order'),
]
