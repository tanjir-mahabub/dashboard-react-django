from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Metric, CartItem, Item

admin.site.register(Metric)
admin.site.register(CartItem)
admin.site.register(Item)
