from django.urls import path
from keypoint_api import views

urlpatterns = [
    path('points/', views.points_list),
    
    path('update-points/', views.update_point),
    
]