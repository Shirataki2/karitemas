from django.urls import path
from .views import UserListAPIView, GroupListAPIView

urlpatterns = [
    path('users/', UserListAPIView.as_view()),
    path('groups/', GroupListAPIView.as_view()),
]
