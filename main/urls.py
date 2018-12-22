from django.urls import path
from .views import UserListAPIView, GroupListAPIView
import django.contrib.auth.views

urlpatterns = [
    path('users/', UserListAPIView.as_view()),
    path('groups/', GroupListAPIView.as_view()),
]
