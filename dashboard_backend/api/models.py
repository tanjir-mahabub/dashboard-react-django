from django.db import models

class Metric(models.Model):
    title = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    icon = models.CharField(max_length=100)
    
    def __str__(self):
        return self.title
    
class CartItem(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
