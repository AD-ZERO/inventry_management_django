# pydantic_db_models.py

from pydantic import BaseModel, Field, EmailStr, PositiveInt, constr
from typing import Literal, Optional
from datetime import date, datetime


class ProductModel(BaseModel):
    name: str = Field(..., max_length=100)
    description: Optional[str] = Field(default=None)
    category: str = Field(..., max_length=50)
    price: float = Field(..., ge=0)
    stock_quantity: int = Field(..., ge=0)

class SupplierModel(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    phone: constr(pattern=r"^\d{10}$")
    address: str = Field(...)

class SaleOrderModel(BaseModel):
    product_id: str = Field(...)
    quantity: PositiveInt
    total_price: float = Field(..., ge=0)
    sale_date: Optional[datetime] = datetime.today()
    status: Optional[Literal["Pending", "Completed", "Cancelled"]] = "Pending"

class StockMovementModel(BaseModel):
    product_id: str = Field(...)
    quantity: int = Field(...)
    movement_type: Literal["In", "Out"]
    movement_date: Optional[datetime] = datetime.today()
    notes: str = Field(..., max_length=300)
