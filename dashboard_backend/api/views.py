from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .models import Metric, CartItem, Item
from .serializers import MetricSerializer, CartItemSerializer, ItemSerializer
from django.contrib.auth import authenticate
from django.http import HttpResponse

class LoginView(APIView):
    permission_classes = [AllowAny]  # No authentication required to log in

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=401)


class LogoutView(APIView):
    def post(self, request):
        request.user.auth_token.delete()  # Delete the token
        return Response({'message': 'Logged out successfully'})

# Home View Function
def home(request):
    return HttpResponse("Welcome to the Dashboard API! Navigate to /api/ for endpoints.")

class MetricsView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        return Response(serializer.data)


class SalesDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Simulated sales data (replace with your actual data source)
        data = {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            "datasets": [
                {
                    "label": "Sales",
                    "data": [120, 190, 300, 500, 200, 300],
                }
            ],
        }
        return Response(data)

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

class ItemsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
