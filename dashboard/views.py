from rest_framework.views import APIView
from rest_framework.response import Response

class MetricsAPIView(APIView):
    def get(self, request):
        data = [
            {"title": "Total Credit", "value": "$10,000"},
            {"title": "Checkout Amount", "value": "$4,500"},
            {"title": "Gift Available", "value": "5"},
            {"title": "Refunds Processed", "value": "$500"},
        ]
        return Response(data)
