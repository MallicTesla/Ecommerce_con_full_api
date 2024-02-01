from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.response import Response

from rest_framework import status, viewsets
from rest_framework.request import Request
from rest_framework.decorators import action

from usuarios.models import Usuario
from usuarios.api.serializers import UsuarioSerializers



class UsuariosViewSets (viewsets.GenericViewSet):
    model = Usuario
    serializer_class = UsuarioSerializers
    # list_serializer_class = UsuarioListaSerializaes

    @action (methods=["POST"], detail=False)
    def nuevo_usuario(self, request:Request):
        usuario_serealizer = self.serializer_class (data = request.data)
        if usuario_serealizer.is_valid():
            usuario_serealizer.save()

            return Response ({"mensage":"usuario registrado corectamente (api.UsuarioViwSet.create)"}, status = status.HTTP_201_CREATED)
        return Response ({"mensage":"error en el registro (api.UsuarioViwSet.create)", "Error":usuario_serealizer.errors}, status = status.HTTP_400_BAD_REQUEST)