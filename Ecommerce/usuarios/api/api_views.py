from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from rest_framework import status, viewsets

from usuarios.models import Usuario
from usuarios.api.serializers import UsuarioNuevoSerializers, UsuarioListaSerializaes


class UsuarioNuevoViewSets (viewsets.GenericViewSet):
    model = Usuario
    serializer_class = UsuarioNuevoSerializers
    # list_serializer_class = UsuarioListaSerializaes

    @action (methods=["POST"], detail=False)
    def nuevo (self, request:Request):
        usuario_serealizer = self.serializer_class (data = request.data)
        if usuario_serealizer.is_valid():
            usuario_serealizer.save()

            return Response ({"mensage":"usuario registrado corectamente (api.UsuarioViwSet.create)"}, status = status.HTTP_201_CREATED)
        return Response ({"mensage":"error en el registro (api.UsuarioViwSet.create)", "Error":usuario_serealizer.errors}, status = status.HTTP_400_BAD_REQUEST)

class UsuarioListaViewSets (viewsets.GenericViewSet):
    model = Usuario
    serializer_class = UsuarioNuevoSerializers
    list_serializer_class = UsuarioListaSerializaes

    def get_queryset(self):
        if self.queryset is None:
            # optiene todos los usuarios con el atributo is_active = True
            # self.queryset = self.serializer_class().Meta.model.objects.filter (is_active = True).values("id", "nombre_usuario", "email", "password")
            #   esto es otra forma de hacerlo
            self.queryset = self.model.objects.filter (is_active = True).values("id", "nombre_usuario", "email", "password")
        return self.queryset

    @action (methods=["GET"], detail=False)
    def lista (self, request:Request):
        usuarios = self.get_queryset()
        usuario_serializer = self.list_serializer_class(usuarios, many=True)
        return Response (usuario_serializer.data, status = status.HTTP_200_OK)



