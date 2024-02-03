from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import action
from rest_framework import status, viewsets

from django.http import HttpResponsePermanentRedirect

from usuarios.models import Usuario
from usuarios.api.serializers import UsuarioNuevoSerializers, UsuarioListaSerializaes, UsuarioSerializers


class UsuarioNuevoViewSets (viewsets.GenericViewSet):
    model = Usuario
    serializer_class = UsuarioNuevoSerializers

    @action (methods=["POST"], detail=False)
    def nuevo (self, request:Request):
        usuario_serealizer = self.serializer_class (data = request.data)
        if usuario_serealizer.is_valid():
            usuario_serealizer.save()

            return Response ({"mensage":"usuario registrado corectamente (api.UsuarioViwSet.create)"}, status = status.HTTP_201_CREATED)
        return Response ({"mensage":"error en el registro (api.UsuarioViwSet.create)", "Error":usuario_serealizer.errors}, status = status.HTTP_400_BAD_REQUEST)


class UsuarioListaViewSets (viewsets.GenericViewSet):
    model = Usuario
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







class UnUsuarioViewSets(viewsets.GenericViewSet):
    print("paso-01")


    @action(methods=["GET", "PUT", "DELETE"], detail=True)
    def usuario(self, request: Request, pk=None):
        #   Esto es equivalente a usar Usuario.objects.get(id=pk)
        usuario = Usuario.objects.filter(id=pk).first()
        print("paso00")

        if usuario:
            print("paso01")
            #   Selecciona a un usuario por id
            if request.method == "GET":
                usuario_serializer = UsuarioSerializers(usuario)
                return Response(usuario_serializer.data, status=status.HTTP_200_OK)

            #   Para editar un usuario
            elif request.method == "PUT":
                print("paso02")
                #   La información de la actualización se guarda en (data=request.data)
                usuario_serializer = UsuarioSerializers(usuario, data=request.data)

                if usuario_serializer.is_valid():
                    usuario_serializer.save()
                    return Response(usuario_serializer.data, status=status.HTTP_200_OK)

                return Response(usuario_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            elif request.method == "DELETE":
                usuario.delete()
                return Response({"message": "Usuario eliminado correctamente"}, status=status.HTTP_200_OK)
            
            else:
                print("paso01")
                return HttpResponsePermanentRedirect(request.path + '/')

        return Response({"message": "No se encontró ninguna coincidencia"}, status=status.HTTP_400_BAD_REQUEST)
    