from django.contrib import admin
from django.urls import path, include
from django.urls import path
from .views import DashboardMetricsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dashboard/', include('dashboard.urls')), 
    path('metrics/', DashboardMetricsView.as_view(), name='dashboard-metrics'),
]