from rest_framework.permissions import SAFE_METHODS, BasePermission


class SafeMethodOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS


class AdminOrAuthUserCanEdit(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        is_safe = request.method in SAFE_METHODS
        try:
            is_author = request.user == obj.auther
        except AttributeError:
            is_author = False
        return is_safe or is_author or request.user.is_superuser
