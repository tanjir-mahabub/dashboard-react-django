from rest_framework import serializers

class DashboardMetricSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    value = serializers.CharField(max_length=50)
    icon = serializers.CharField(max_length=50)
