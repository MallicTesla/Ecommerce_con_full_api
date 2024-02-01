#   cuando se usa GenericViewSet enves de urls se usa routers
from rest_framework.routers import DefaultRouter

from usuarios.api.app import UsuariosViewSets

router = DefaultRouter()

router.register ("usuarios", UsuariosViewSets, basename = "usuario")

urlpatterns = router.urls



