#   cuando se usa GenericViewSet enves de urls se usa routers
from rest_framework.routers import DefaultRouter

from usuarios.api.api_views import UsuarioNuevoViewSets, UsuarioListaViewSets

router = DefaultRouter()

router.register ("usuario", UsuarioNuevoViewSets, basename = "usuario")
router.register ("usuario_lista", UsuarioListaViewSets, basename = "usuario")

urlpatterns = router.urls



