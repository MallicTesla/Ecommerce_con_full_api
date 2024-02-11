from django.conf import settings
from django.urls import re_path
from django.contrib import admin
from django.urls import path, re_path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

# JWT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


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
    #  JWT
    #   esta ruta sirve para retornar y refrescar el token de acseso para un usuario y contraseña que se le envia
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #   refresca el toquen que estas usando
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('admin/', admin.site.urls),

    # mis apps
    # usuario
    path ("usuario/", include("usuarios.api.routers")),
    # producto
    path ("productos/", include ("productos.api.routers")),
    # gestion_gastos
    path ("gasto/", include ("gestion_gastos.api.routers")),

]
