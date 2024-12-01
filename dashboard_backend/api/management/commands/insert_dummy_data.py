from django.core.management.base import BaseCommand
from api.models import Metric, CartItem, Item

class Command(BaseCommand):
    help = "Insert dummy data into the database"

    def handle(self, *args, **kwargs):
        # Insert dummy data for Metrics
        metrics = [
            {"title": "Total Credit", "value": "1000 USD", "icon": "CurrencyDollarIcon"},
            {"title": "Checkout Amount", "value": "500 USD", "icon": "ShoppingCartIcon"},
            {"title": "Gift Available", "value": "3", "icon": "GiftIcon"},
            {"title": "Delivery Pending", "value": "7", "icon": "TruckIcon"},
        ]
        for metric in metrics:
            Metric.objects.get_or_create(**metric)
        self.stdout.write(self.style.SUCCESS(f"Inserted {len(metrics)} Metric records."))

        # Insert dummy data for Cart Items
        cart_items = [
            {"name": "Item A", "quantity": 2, "price": 25.50},
            {"name": "Item B", "quantity": 1, "price": 15.75},
            {"name": "Item C", "quantity": 5, "price": 5.00},
        ]
        for item in cart_items:
            CartItem.objects.get_or_create(**item)
        self.stdout.write(self.style.SUCCESS(f"Inserted {len(cart_items)} CartItem records."))

        # Insert dummy data for Items
        items = [
            {"name": "Product 1", "description": "This is a dummy description for Product 1."},
            {"name": "Product 2", "description": "This is a dummy description for Product 2."},
            {"name": "Product 3", "description": "This is a dummy description for Product 3."},
        ]
        for item in items:
            Item.objects.get_or_create(**item)
        self.stdout.write(self.style.SUCCESS(f"Inserted {len(items)} Item records."))
