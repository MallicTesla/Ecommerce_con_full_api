from rest_framework import status, viewsets, generics
from rest_framework.response import Response

# esto se usa para no repetir tanto codigo en general_views.py
class GeneralListaApiView (generics.ListAPIView):
    # este atributo se estavlese en none mientras espera que se establesca en la clase derivada
    serializer_class = None

    #  Este es un método que devuelve el conjunto de consultas que se utilizará para recuperar los objetos del modelo que se mostrarán en la lista. 
    def get_queryset(self):
        #   get_serializer entras a al serealizador y luego entras a la clase meta y despues entras al atributo model
        model = self.get_serializer().Meta.model
        return model.objects.filter (estado = True)



class BaseViewSet (viewsets.ModelViewSet):
    serializer_class = None

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.filter(estado=True)

    def list(self, request):
        """Lista


        Descripcion"""
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


    def destroy(self, request, pk=None):
        """Borrado total


        Descripcion"""
        instance = self.get_object()
        if instance:
            instance.delete()
            return Response({"message": "Eliminado correctamente"}, status=status.HTTP_200_OK)
        return Response({"error": "No se encuentra ningún objeto con esos datos"}, status=status.HTTP_400_BAD_REQUEST)