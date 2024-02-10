from rest_framework.routers import DefaultRouter

from gestion_gastos.api.viewset.gasto_viewset import GastoViewSets

router = DefaultRouter()

router.register(r"gastos", GastoViewSets, basename = "gasto")

urlpatterns = router.urls