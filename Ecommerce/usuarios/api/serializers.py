from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.hashers import make_password

from usuarios.models import Usuario


class UsuarioSerializers (serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = "__all__"

    def create(self, validated_data):
        #   una forma mas segura de encriptar la contraseña
        # validated_data['password'] = make_password(validated_data['password'])
        usuario = Usuario (**validated_data)
        #   aca se toma la contraseña cuando creas un usuario nuevo y la encripta
        usuario.set_password (validated_data ["password"])
        usuario.save()
        return usuario


class UsuarioListaSerializaes (serializers.ModelSerializer):
    class Meta :
        model = Usuario

    def to_representation (self, instance):
        # print (f"desde serealizador f {instance}")
        #   asi se llama a la automatizasion del serealizador para que funsione normal mente
        # super().to_representation (instance)
        #   asi muestra solo los campos definidos tambien se tienen que definir en el objeto en api.py
        #   si se usa .values en el objeto en api.py aca se tiene que pasar los campos como si fuera una lista sino se le pasa solo el atributo id":instance.id,
        return {
            #   podes modificar lo que esta antes del instance para que muestre eso sin modificar el modelo
            "id":instance ["id"],
            "nombre de usuario":instance ["nombre_usuario"],
            "correo":instance ["email"],
            "password":instance ["password"],
        }


class ActualizasionUsuarioSerializers (serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ("nombre_usuario", "email", "nombre", "apellido", )


class ActualizarContraseñaSerializaes (serializers.Serializer):
    password_1 = serializers.CharField(max_length = 128, min_length =3, write_only = True)
    password_2 = serializers.CharField(max_length = 128, min_length =3, write_only = True)

    #   esto es para que pida contraseña de confirmacion cuando la actualizas
    def validate (self, data):
        if data["password_1"] != data["password_2"]:
            raise serializers.ValidationError({"password":"Las contraseñas no son iguales (api.serealizador)"})
        return data


class OptenerTokenCustomPairView (TokenObtainPairSerializer):
    pass

class CustomUsuarioSerializers (serializers.ModelSerializer):
    class Meta :
        model = Usuario
        fields = ("nombre_usuario", "email", "nombre", "apellido", )