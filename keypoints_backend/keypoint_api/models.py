from django.db import models

# Create your models here.
class KeyPoints(models.Model):
    xPoint = models.CharField(max_length=100, default='')
    yPoint = models.CharField(max_length=100, default='')
