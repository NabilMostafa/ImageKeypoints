from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from keypoint_api.serializers import *
from django.http import JsonResponse
import json
import requests

# Create your views here.
@csrf_exempt
def points_list(request):
    if request.method == 'GET':
        points = KeyPoints.objects.all()
        serializer = PointsSerializer(points, many=True)
        # --------------------------------------------------
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def update_point(request):
     data = json.loads(request.body)
     print(data)
     point = KeyPoints.objects.get(id=data['id'])
     point.xPoint = data['xPoint']
     point.yPoint = data['yPoint']
     point.save()
     return JsonResponse({'error': False})