#   cuando se usa GenericViewSet enves de urls se usa routers
from rest_framework.routers import DefaultRouter

from usuarios.api.api_views import UsuarioViwSet

router = DefaultRouter()

router.register ("usuario", UsuarioViwSet, basename = "usuario")

urlpatterns = router.urls



