from django.conf import settings
from django.urls import re_path
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi



schema_view = get_schema_view(
    openapi.Info(
        title="Mallic API",
        default_version='v1',
        description="Una API de ecommerce para practicar",
        terms_of_service="https://github.com/MallicTesla",
        contact=openapi.Contact(email="el_mallic@hotmail.com"),
        license=openapi.License(name="Your License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),

    # mis apps
    path ("usuario/", include("usuarios.api.routers")),

]
