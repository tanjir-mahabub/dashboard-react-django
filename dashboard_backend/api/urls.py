from django.urls import path
from .views import MetricsView, SalesDataView, CartView, ItemsView, LoginView, LogoutView

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('dashboard/metrics/', MetricsView.as_view(), name='metrics'),
     path('dashboard/sales-data/', SalesDataView.as_view(), name='sales-data'),
    path('dashboard/cart/', CartView.as_view(), name='cart'),
    path('dashboard/items/', ItemsView.as_view(), name='items'),
]
