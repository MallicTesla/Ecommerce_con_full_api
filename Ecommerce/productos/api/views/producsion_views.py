# con la libreria JWT no se usa esto
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
# los parsrs son para las imagenes y ya vienen incluidos
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
#   autentificado con la libreria JWT
#   asi se define la autentificasion JWT si lo queres en una vista espesifica
# from rest_framework.permissions import IsAuthenticated

from base.herramientas import validar_archivo
from productos.api.serealizadores.producto_serealizador import ProductoSerealizera
# se comento porque con la libreria JWT no se usa
# from usuarios.autentificasion_mixer import Autentificador
# con la libreria JWT no se usa esto
from base.api import GeneralListaApiView

# las urls con las que se llaman a los ViewSets van en el archivo routers.py
#   ModelViewSet hace toda las rutas y metodos de foram automatica pero se pueden sobre escrivir
# class ProductoViewSets (Autentificador, viewsets.ModelViewSet):
#   se borra el Autentificador para el autentificador global
class ProductoViewSets (viewsets.ModelViewSet):
    #   esto ya viene incluido no es nesesario re incluirlos 
    parser_classes = (JSONParser, MultiPartParser)
    serializer_class = ProductoSerealizera
    # asi se define la autentificasion JWT si lo queres en una vista espesifica
    # permission_classes = (IsAuthenticated,)
    # esto sustitulle al metodo get_queryset y no es nesesario modificar el routers.py
    # queryset = ProductoSerealizera.Meta.model.objects.filter(estado = True)

    # ejemplo
    #   para usar este metodo tenes que agregar en la ruta del archivo routers.py un basename
    def get_queryset(self, pk = None):
        if pk is None :
            return self.get_serializer().Meta.model.objects.filter (estado = True)
        else:
            return self.get_serializer().Meta.model.objects.filter(id = pk, estado = True).first()

    #   esto mostraria todos los productos
    def list (self, request):
        #   muestra todas las claves (key) de esta clase
        # for clave, valor in request.__dict__.items():
        #     print (clave,"==",valor)

        serealizador = self.get_serializer(self.get_queryset(), many = True)
        return Response (serealizador.data, status = status.HTTP_200_OK)

    #   es lo mismo que un metodo post que es un http PUT
    def create (self, request):
        print (request.data)
        #   esta es una comprovacion para saber si me estan mandando una imagen o una cadena vacia el serealizador no se da cuenta
        data = validar_archivo(request.data, "imagen_producto")
        serealizador = self.serializer_class (data = data)
        if serealizador.is_valid():
            serealizador.save()
            return Response ({"message":"Producto creado corectamente"}, status = status.HTTP_201_CREATED)
        return Response (serealizador.errors, status = status.HTTP_400_BAD_REQUEST)

#   el delate por defecto elimina el producto por completo
#   es lo mismo que el otro delete 
    def destroy (self, request, pk = None):
        producto = self.get_queryset().filter(id = pk).first()
        if producto :
            producto.estado = False
            producto.save()
            return Response ({"message":"Eliminado corectamente"}, status = status.HTTP_200_OK)
        return Response ({"error":"No se encuentra ningun producto con esos datos"}, status = status.HTTP_400_BAD_REQUEST)

#   es lo mismo que para actualisar
    def update (self, request, pk = None):
        if self.get_queryset(pk):
            data = validar_archivo(request.data,"imagen_producto", True)
            producto_serealaizer = self.serializer_class(self.get_queryset (pk), data = data)
            # producto_serealaizer = self.serializer_class(self.get_queryset (pk), data = request.data)
            if producto_serealaizer.is_valid():
                producto_serealaizer.save()
                return Response (producto_serealaizer.data, status = status.HTTP_200_OK)
            return Response (producto_serealaizer.errors, status = status.HTTP_400_BAD_REQUEST)

# --------------------------------------------------------------------------------------------------------------------------------------------

#   con CreateAPIView solo podes agregar productos nuevos
#   con ListCreateAPIView devuelve una lista con todo los productos y ademas podes agregar nuevos
class ProductoListaCrearAPIView (generics.ListCreateAPIView):
    serializer_class = ProductoSerealizera
    #   esta es la consulta de lo que estoy buscando en este caso es un listado con todos los productos
    queryset = ProductoSerealizera.Meta.model.objects.filter(estado = True)

    #   asi es para hacer un PUT
    def post(self, request):
        serealizador = self.serializer_class (data = request.data)
        if serealizador.is_valid():
            serealizador.save()
            return Response ({"message":"Producto creado corectamente"}, status = status.HTTP_201_CREATED)
        return Response (serealizador.errors, status = status.HTTP_400_BAD_REQUEST)

#   RetrieveAPIView devuelve un solo producto 
#   RetrieveUpdateAPIView devuelve un solo producto y lo podes actualisar
#   RetrieveUpdateDestroyAPIView devuelve un solo producto, lo podes actualisar y lo podes borrar 
class ProductoActualizarBorrarAPIView (generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductoSerealizera

    # muestra el producto
    def get_queryset(self, pk = None):
        if pk is None :
            return self.get_serializer().Meta.model.objects.filter (estado = True)
        else:
            return self.get_serializer().Meta.model.objects.filter(id = pk, estado = True).first()

    #   con patch se hace la solisitud de la info
    def patch(self, request, pk = None):
        if self.get_queryset(pk):
            producto_serealaizer = self.serializer_class(self.get_queryset (pk))
            return Response (producto_serealaizer.data, status = status.HTTP_200_OK)
        return Response ({"error":"No se encuentra ningun producto con esos datos"}, status = status.HTTP_400_BAD_REQUEST)

    #   con put se actualisa la info
    def put (self, request, pk = None):
        if self.get_queryset(pk):
            producto_serealaizer = self.serializer_class(self.get_queryset (pk), data = request.data)
            if producto_serealaizer.is_valid():
                producto_serealaizer.save()
                return Response (producto_serealaizer.data, status = status.HTTP_200_OK)
            return Response (producto_serealaizer.errors, status = status.HTTP_400_BAD_REQUEST)

    #   asi se relasa una eliminasion logica que cambia el estado de activo a inactivo
    def delete (self, request, pk = None):
        producto = self.get_queryset().filter(id = pk).first()
        if producto :
            producto.estado = False
            producto.save()
            return Response ({"message":"Eliminado corectamente"}, status = status.HTTP_200_OK)
        return Response ({"error":"No se encuentra ningun producto con esos datos"}, status = status.HTTP_400_BAD_REQUEST)

# ---------------------------------------------------------------------------------------------------------------------------------

#   devuelve todos los productos (ahora no lo uso esto tambien lo ago en otra clase)
class ProdctoListaAPIView (GeneralListaApiView):
    serializer_class = ProductoSerealizera


#   asi borras un producto directamente de la base de datos no es muy recomendavle hacerlo (ahora no lo uso esto tambien lo ago en otra clase)
class ProductoBorrarAPIView (generics.DestroyAPIView):
    serializer_class = ProductoSerealizera

    def get_queryset(self):
        return self.get_serializer().Meta.model.objects.filter(estado = True)

    #   asi se relasa una eliminasion logica que cambia el estado de activo a inactivo
    def delete (self, request, pk = None):
        producto = self.get_queryset().filter(id = pk).first()
        if producto :
            producto.estado = False
            producto.save()
            return Response ({"message":"Eliminado corectamente"}, status = status.HTTP_200_OK)
        return Response ({"error":"No se encuentra ningun producto con esos datos"}, status = status.HTTP_400_BAD_REQUEST)


#   UpdateAPIView actualisa un producto (ahora no lo uso esto tambien lo ago en otra clase)
class ProductoActualizarAPIView (generics.UpdateAPIView):
    serializer_class = ProductoSerealizera

    def get_queryset(self, pk):
        return self.get_serializer().Meta.model.objects.filter(estado = True).filter(id = pk).first()

    #   con patch se hace la solisitud de la info
    def patch(self, request, pk = None):
        if self.get_queryset(pk):
            producto_serealaizer = self.serializer_class(self.get_queryset (pk))
            return Response (producto_serealaizer.data, status = status.HTTP_200_OK)
        return Response ({"error":"No se encuentra ningun producto con esos datos"}, status = status.HTTP_400_BAD_REQUEST)

    #   con put se actualisa la info
    def put (self, request, pk = None):
        if self.get_queryset(pk):
            producto_serealaizer = self.serializer_class(self.get_queryset (pk), data = request.data)
            if producto_serealaizer.is_valid():
                producto_serealaizer.save()
                return Response (producto_serealaizer.data, status = status.HTTP_200_OK)
            return Response (producto_serealaizer.errors, status = status.HTTP_400_BAD_REQUEST)


