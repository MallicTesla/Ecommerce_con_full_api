from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from usuarios.models import Usuario

# Crea un usuario nuevo
class UsuarioNuevoSerializers (serializers.ModelSerializer):
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


# Optine todo los usuarios
class UsuarioListaSerializaes (serializers.ModelSerializer):
    class Meta :
        model = Usuario

    def to_representation (self, instance):
        return {
            #   podes modificar lo que esta antes del instance para que muestre eso sin modificar el modelo
            "id":instance ["id"],
            "nombre de usuario":instance ["nombre_usuario"],
            "correo":instance ["email"],
            "password":instance ["password"],
        }





class UsuarioSerializers (serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ("nombre_usuario", "email", "nombre", "apellido", "password")

    def create(self, validated_data):
        usuario = Usuario (**validated_data)
        #   aca se toma la contraseña cuando creas un usuario nuevo y la encripta
        usuario.set_password (validated_data ["password"])
        usuario.save()
        return usuario

