from rest_framework import serializers
from keypoint_api.models import *


class PointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = KeyPoints
        fields = '__all__'