from django.urls import path
from .views import UserListAPIView, GroupListAPIView

urlpatterns = [
    path('user/<id>', UserListAPIView.as_view()),
    path('groups/', GroupListAPIView.as_view()),
]
