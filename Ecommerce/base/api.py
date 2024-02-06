from rest_framework import generics

# esto se usa para no repetir tanto codigo en general_views.py
class GeneralListaApiView (generics.ListAPIView):
    # este atributo se estavlese en none mientras espera que se establesca en la clase derivada
    serializer_class = None

    #  Este es un método que devuelve el conjunto de consultas que se utilizará para recuperar los objetos del modelo que se mostrarán en la lista. 
    def get_queryset(self):
        #   get_serializer entras a al serealizador y luego entras a la clase meta y despues entras al atributo model
        model = self.get_serializer().Meta.model
        return model.objects.filter (estado = True)