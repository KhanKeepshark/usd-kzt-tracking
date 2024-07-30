from django.urls import path
from . import views

urlpatterns = [
    path('', views.ChartContent.as_view(), name='ChartContent'),
]