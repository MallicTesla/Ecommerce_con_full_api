from django.urls import path
from productos.api.views.general_views import UnidadeMedidaListaAPIView, CategoriaProductoListaAPIView, IndicadorListaAPIView
from productos.api.views.producsion_views import (
    ProdctoListaAPIView, ProductoListaCrearAPIView, ProductoActualizarBorrarAPIView ,ProductoBorrarAPIView, ProductoActualizarAPIView)

urlpatterns = [
    #   asi se hace la view cuando usas una clase
    path ("unidad_medida/", UnidadeMedidaListaAPIView.as_view(), name = "unidad_medida"),
    path ("categoria_producto/", CategoriaProductoListaAPIView.as_view(), name = "categoria_producto"),
    path ("indicador/", IndicadorListaAPIView.as_view(), name = "indicador"),

    # path ("producto/lista/", ProdctoListaAPIView.as_view(), name = "Productos_lista"),
    path ("producto/", ProductoListaCrearAPIView.as_view(), name = "producto_crear"),
    path ("producto-actualizar-borrar/<int:pk>/", ProductoActualizarBorrarAPIView.as_view(), name = "producto_id"),
    # path ("producto/borrar/<int:pk>/", ProductoBorrarAPIView.as_view(), name = "producto_borrar_id"),
    # path ("producto/actualizar/<int:pk>/", ProductoActualizarAPIView.as_view(), name = "producto_actualizar_id"),

]