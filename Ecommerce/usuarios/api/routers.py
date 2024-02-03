#   cuando se usa GenericViewSet enves de urls se usa routers
from rest_framework.routers import DefaultRouter

from usuarios.api.api_views import UsuarioNuevoViewSets, UsuarioListaViewSets, UnUsuarioViewSets

router = DefaultRouter()

router.register ("nuevo_usuario", UsuarioNuevoViewSets, basename = "usuario")
router.register ("lista_usuarios", UsuarioListaViewSets, basename = "usuario")
router.register ("un_usuario", UnUsuarioViewSets, basename = "usuario")

urlpatterns = router.urls



