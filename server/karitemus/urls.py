"""karitemus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import index, check_token, delete_token, get_user_by_id

urlpatterns = list([
    path('grappelli/', include('grappelli.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),
    path('auth/', include('rest_framework_social_oauth2.urls')),
    path('api/login/', include('rest_social_auth.urls_token')),
    path('api/login/', include('rest_social_auth.urls_session')),
    path('api/login/', include('rest_social_auth.urls_jwt')),
    path('api/check/', check_token),
    path('api/delete_token/', delete_token),
    path('api/uget/', get_user_by_id),
    path('', index, name='index'),
] + static(settings.STATIC_URL))
# path('', include('social_django.urls'))
