from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action, api_view
from rest_framework import status, viewsets

from django.http import HttpResponsePermanentRedirect

from usuarios.models import Usuario
from usuarios.api.serializers import UsuarioSerializers, UsuarioListaSerializaes, ActualizasionUsuarioSerializers, ActualizarContraseñaSerializaes


# los nombres de cada metodo se pueden modificar por el que quieras pero estos son los nombres por combencion
class UsuarioViwSet (viewsets.GenericViewSet):
    # para no crear una instansia como esta (self.serializer_class().Meta.model) se usa esto
    model = Usuario
    serializer_class = UsuarioSerializers
    list_serializer_class = UsuarioListaSerializaes
    #   GenericViewSet viene con esta variable en none por defecto asi que no es nesesaria hacerlo aca
    queryset = None


    def get_object(self, pk):
        # se puede hacer asi
        return self.serializer_class().Meta.model.objects.filter(id = pk).first()

        # tambien se puede hacer asi
        # try:
        #     return self.serializer_class().Meta.model.objects.get(id = pk)
        # except:
        #     #   mensage con el error

        # y esta es otra forma
        # return get_list_or_404 (self.serializer_class.Meta.model, pk = pk)
        # return get_list_or_404 (self.model, pk = pk)


    def get_queryset(self):
        if self.queryset is None:
            # optiene todos los usuarios con el atributo is_active = True
            # self.queryset = self.serializer_class().Meta.model.objects.filter (is_active = True).values("id", "nombre_usuario", "email", "password")
            #   esto es otra forma de hacerlo
            self.queryset = self.model.objects.filter (is_active = True).values("id", "nombre_usuario", "email", "password")
        return self.queryset


    def list (self, request:Request):
        usuarios = self.get_queryset()
        usuario_serializer = self.list_serializer_class(usuarios, many=True)
        return Response (usuario_serializer.data, status = status.HTTP_200_OK)


    def create (self, request:Request):
        usuario_serealizer = self.serializer_class (data = request.data)
        if usuario_serealizer.is_valid():
            usuario_serealizer.save()

            return Response ({"mensage":"usuario registrado corectamente (api.UsuarioViwSet.create)"}, status = status.HTTP_201_CREATED)
        return Response ({"mensage":"error en el registro (api.UsuarioViwSet.create)", "Error":usuario_serealizer.errors}, status = status.HTTP_400_BAD_REQUEST)


    #   selecsiona un usuario y lo muestra
    def retrieve (self, request:Request, pk=None):
        usuario = self.get_object(pk)
        usuario_serializer = self.serializer_class(usuario)
        return Response (usuario_serializer.data, status=status.HTTP_200_OK)


    #   actualisar un usuario
    def update (self,  request:Request, pk=None):
        usuario = self.get_object (pk)
        # asi es la actualisasion si no tenes un serealizador para actualizzar
        # usuario_serializer = self.serializer_class(usuario, data = request.data)
        # asi es cuando tenes un serealizador para actualizar
        usuario_serializer = ActualizasionUsuarioSerializers(usuario, data = request.data)

        if usuario_serializer.is_valid():
            usuario_serializer.save()

            return Response ({"Mensage":"El usauario se actualizo corectamente " , "Nuevos datos":usuario_serializer.data}, status = status.HTTP_200_OK)
        return Response ({"Mensagr":"Error en la actualizasion", "Error":usuario_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)


    #   eliminar un usario
    def destroy (self,  request:Request, pk=None):
        # eliminacion total
        # usuario_eliminado = self.get_object (pk)
        #   eliminasion logica  esta linia devuelbe un valor numerico
        usuario_eliminado = self.model.objects.filter (id=pk). update(is_active = False)
        if usuario_eliminado == 1:
            return Response ({"Mensage":"Usuario eliminado corectamente (api.UsuarioViwSet.create)"})
        return Response ({"Mensage":"No existe un usuario con ese id (api.UsuarioViwSet.create)"}, status = status.HTTP_404_NOT_FOUND)


    #   asi sse crea una ruta nueva
    #   (detail = True) es un campo obligatorio cuando esta en True la ruta pide un id que 
    #   va despues de la ruta prinsipal y antes del nombre de esta funcion
    #   (url_path) pones el nombre de la ruta que queres por si no queres que se llame igual que este metodo tamvien se pueden agregar expresiones regulares de esta forma
    #   (methods) elegis el metodo que queres que res usar se pueden colocar varios metodos
    @action (detail = True, methods = ["PUT"], url_path = "cambiar_contraseña")
    def actualizar_contraseña (self,  request:Request, pk=None):
        usuario = self.get_object(pk)
        contraseña_serializaes = ActualizarContraseñaSerializaes(data = request.data)

        if contraseña_serializaes.is_valid():
            usuario.set_password (contraseña_serializaes.validated_data ["password_1"])
            usuario.save()

            return Response ({"Mensage":"contraseña actualizada corectamente"})
        return Response ({"Mensage":"Hay errores en la informacion enviada", "Error":contraseña_serializaes.errors}, status = status.HTTP_400_BAD_REQUEST)
