from django.contrib import admin
from django.urls import path, include
from django.urls import path
from .views import MetricsAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dashboard.urls')),
    path('metrics/', MetricsAPIView.as_view(), name='metrics'),
]
