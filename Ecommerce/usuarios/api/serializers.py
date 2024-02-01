from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from usuarios.models import Usuario

class UsuarioSerializers (serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"

    # def create (self, validated_data):
    #     usuario = Usuario (**validated_data)
    #     #   aca se toma la contraseña cuando creas un usuario nuevo y la encripta
    #     usuario.set_password (validated_data ["password"])
    #     usuario.save()
    #     return usuario

    def create (self, validated_data):
        #  Esta función se utiliza para generar una cadena de contraseña encriptada sin necesidad de tener una instancia de modelo de usuario.
        validated_data['password'] = make_password(validated_data['password'])
        usuario = Usuario(**validated_data)
        usuario.save()
        return usuario