from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response

from productos.models import UnidadMedida, CategoriaProducto, Indicador
from productos.api.serealizadores.general_serealaizer import UnidadMedidaSerealizera, CategoriaProductoSerealizera, IndicadorSerealizera
from base.api import GeneralListaApiView

# -----------------------------------------------------------------------------------------------------------------------------

#   asi se hace si queres ahorarte el get_queryset
#   tambien se puede usar GeneralListaApiView pero no sirve para usar swagger 
class UnidadeMedidaViewSet (viewsets.ModelViewSet):
    serializer_class = UnidadMedidaSerealizera

class CategoriaProductoViewSet (viewsets.ModelViewSet):
    #  muestra solo los campos definidos en la clase Meta del serealizador
    serializer_class = CategoriaProductoSerealizera

#   con GenericViewSet tenes que definir lo que queres que se muestre en swagger
class IndicadorViewSet (viewsets.GenericViewSet):
    """
    esta descripsion es remplasada
    por la que se encuentra dentro de cada metodo
    """
    moodel = Indicador
    serializer_class = IndicadorSerealizera

    def get_queryset(self): 
        return self.get_serializer().Meta.model.objects.filter(estado = True)

    def list (self, request):
        """
        si lo sparo con dos enters


        lo de ariva aparese como comentario prinsipal
        la descripsion de aparese solo en cuando desplegas el metodo"""
        date = self.get_queryset()
        data = self.get_serializer(data, many = True)
        return Response (data.data)

# ----------------------------------------------------------------------------------------------------------------------------------

# class UnidadeMedidaListaAPIView (generics.ListAPIView):
#     serializer_class = UnidadMedidaSerealizera

#     def get_queryset(self):
#         return UnidadMedida.objects.filter (estado = True)

# class CategoriaProductoListaAPIView (generics.ListAPIView):
#     serializer_class = CategoriaProductoSerealizera

#     def get_queryset(self):
#         return CategoriaProducto.objects.filter (estado = True)

# class IndicadorListaAPIView (generics.ListAPIView):
#     serializer_class = IndicadorSerealizera

#     def get_queryset(self):
#         return Indicador.objects.filter (estado = True)


