from rest_framework.views import APIView
from rest_framework.response import Response

class DashboardMetricsView(APIView):
    def get(self, request):
        # Sample dashboard data (replace with database queries later if needed)
        metrics = [
            {"title": "Total Credit", "value": "$10,000", "icon": "currency-dollar"},
            {"title": "Checkout Amount", "value": "$4,500", "icon": "shopping-cart"},
            {"title": "Gift Available", "value": "5", "icon": "gift"},
            {"title": "Active Users", "value": "350", "icon": "user-group"},
        ]
        return Response(metrics)
