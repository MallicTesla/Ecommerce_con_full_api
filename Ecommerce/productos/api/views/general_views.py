from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.request import Request

from productos.models import UnidadMedida, CategoriaProducto, Indicador
from productos.api.serealizadores.general_serealaizer import UnidadMedidaSerealizera, CategoriaProductoSerealizera, IndicadorSerealizera
from base.api import GeneralListaApiView, BaseViewSet

# -----------------------------------------------------------------------------------------------------------------------------


class UnidadeMedidaViewSet (BaseViewSet):
    serializer_class = UnidadMedidaSerealizera



class CategoriaProductoViewSet (BaseViewSet):
    serializer_class = CategoriaProductoSerealizera


    #   todo esto esta dentro de la clase padre BaseViewSet
    # def get_queryset(self): 
    #     return self.get_serializer().Meta.model.objects.filter(estado = True)


    # def list (self, request):
    #     """Lista de categorias"""
    #     date = self.get_queryset()
    #     data = self.get_serializer(date, many = True)
    #     return Response (data.data)


    # def destroy (self, request, pk = None):
    #     categoria = self.get_object()
    #     if categoria :
    #         categoria.delete()
    #         return Response ({"message":"Eliminado corectamente"}, status = status.HTTP_200_OK)
    #     return Response ({"error":"No se encuentra ningun categoria con esos datos"}, status = status.HTTP_400_BAD_REQUEST)



#   con GenericViewSet tenes que definir lo que queres que se muestre en swagger
# class IndicadorViewSet (viewsets.GenericViewSet):
class IndicadorViewSet (BaseViewSet):

    # moodel = Indicador
    serializer_class = IndicadorSerealizera

    # def get_queryset(self): 
    #     return self.get_serializer().Meta.model.objects.filter(estado = True)

    # def list (self, request):
    #     """
    #     si lo separo con dos enters


    #     lo de ariva aparese como comentario prinsipal
    #     la descripsion de aparece solo en cuando desplegas el metodo"""
    #     date = self.get_queryset()
    #     data = self.get_serializer(date, many = True)
    #     return Response (data.data)

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


