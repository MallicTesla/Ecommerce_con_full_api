from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from usuarios.api.serializers import OptenerTokenCustomPairView, CustomUsuarioSerializers
from usuarios.models import Usuario

class Login (TokenObtainPairView):
    serializer_class = OptenerTokenCustomPairView

    def post (self, request:Request, *args, **kwargs):
        nombre_usuario = request.data.get ("nombre_usuario", "")
        password = request.data.get ("password", "")
        #  devuelve un booliano se existe un usario con esas caracteristicas
        usuario = authenticate (
            nombre_usuario = nombre_usuario,
            password = password
        )

        if usuario:
            login_serealzador = self.serializer_class (data = request.data)
            if login_serealzador.is_valid ():
                usuario_serealzador = CustomUsuarioSerializers (usuario)

                return Response ({
                    "token": login_serealzador.validated_data.get ("access"),
                    "refresh-token": login_serealzador.validated_data.get("refresh"),
                    "usuario": usuario_serealzador.data,
                    "mensage": "inisio de sesion exitosa"
                }, status = status.HTTP_200_OK)

            return Response ({"Error": "contraseña o usuario incorectos"}, status = status.HTTP_400_BAD_REQUEST)
        return Response ({"Error": "contraseña o usuario incorectos"}, status = status.HTTP_400_BAD_REQUEST)

class Logaut (GenericAPIView):
    def post (self, request:Request, *args, **kwargs):
        #   para que las "ciere la sesion" tenes que pasarle el id del usuario
        usuario = Usuario.objects.filter (id = request.data.get ("usuario", 0))
        if usuario.exists():
            #   Como no tengo ninguna sesion abierta la unica forma de hacer el logaut es refrescando el token
            RefreshToken.for_user(usuario.first())
            return Response({"Mensage": "Sesion cerada corectamente"}, status = status.HTTP_200_OK)
        return Response ({"Error": "No existe este usuario"}, status = status.HTTP_400_BAD_REQUEST)
