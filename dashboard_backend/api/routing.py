from django.urls import path
from api.consumers import RealTimeDataConsumer

websocket_urlpatterns = [
    path('ws/realtime-data/', RealTimeDataConsumer.as_asgi()),
]
