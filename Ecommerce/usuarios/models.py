from django.db import models
# BaseUserManager se usa para heredar nuevas instancias a la clase Gestor_Usuario
# AbstractBaseUser es una clase abstracta que proporciona la implementación básica de un modelo de usuario personalizado.
# PermissionsMixin es una clase que proporciona campos y métodos para gestionar permisos de usuario, como los permisos de grupo y los permisos individuales.
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
# Cargar el historial de cambios
# from simple_history.models import HistoricalRecords

# el usuario se suele hacer en 2 calases distintas para manegar mejor la seguridad y agregarle mas instansias al usuario
class Gestor_Usuario (BaseUserManager):
    # Método privado para crear un usuario
    def _crear_usuario(self, nombre_usuario, email, nombre, apellido, password, is_staff, is_superuser, **extra_fields):
        # Crear una instancia del modelo de usuario con los datos proporcionados
        usuario = self.model(
            nombre_usuario=nombre_usuario,
            email=email,
            nombre=nombre,
            apellido=apellido,
            is_staff=is_staff,
            is_superuser=is_superuser,
            **extra_fields
        )
        # Encriptar la contraseña y guardar el usuario en la base de datos
        usuario.set_password(password)
        usuario.save(using=self.db)
        return usuario

    # Método para buscar un usuario por su nombre de usuario natural
    def get_by_natural_key(self, nombre_usuario):
        return self.get(nombre_usuario=nombre_usuario)

    # Método para crear un usuario estándar
    def create_user(self, nombre_usuario, email, nombre, apellido, password=None, **extra_fields):
        return self._crear_usuario(nombre_usuario, email, nombre, apellido, password, False, False, **extra_fields)

    # Método para crear un superusuario
    def create_superuser(self, nombre_usuario, email, nombre, apellido, password=None, **extra_fields):
        return self._crear_usuario(nombre_usuario, email, nombre, apellido, password, True, True, **extra_fields)

# Modelo de Usuario personalizado que hereda de AbstractBaseUser y PermissionsMixin
class Usuario (AbstractBaseUser, PermissionsMixin):
    # Campos del modelo
    nombre_usuario = models.CharField(max_length=255, unique=True)
    email = models.EmailField('Correo Electrónico', max_length=255, unique=True)
    nombre = models.CharField('Nombres', max_length=255, blank=True, null=True)
    apellido = models.CharField('Apellido', max_length=255, blank=True, null=True)
    # imagen = models.ImageField('Imagen de perfil', upload_to='perfil/', max_length=255, null=True, blank=True)
    # activa y desactiva un usuario 
    is_active = models.BooleanField(default=True)
    # le da al usuario permisos para entrar al panel de django
    is_staff = models.BooleanField(default=False)
    # historico = HistoricalRecords()  # Registra el historial de cambios

    objects = Gestor_Usuario()  # Objeto del gestor de usuarios

    # Configuración del modelo
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    USERNAME_FIELD = 'nombre_usuario'  # Campo que se utilizará como nombre de usuario
    REQUIRED_FIELDS = ['email', 'nombre', 'apellido']  # Campos requeridos al crear un nuevo usuario

    # Método para obtener la clave natural del usuario
    # La calave natural se usa para buscar un usuario (por nombre_usuario) como si se buscara por id
    def natural_key(self):
        return (self.nombre_usuario,)

    # Método para representar el objeto como una cadena
    def __str__(self):
        return f'{self.nombre} {self.apellido}'

    # Método save comentado. Se puede definir personalizado si es necesario.
    # def save(self, *args, **kwargs):
    #     print("Estoy en el save del modelo")