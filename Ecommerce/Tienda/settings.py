"""
Django settings for Tienda project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""
import os
from pathlib import Path
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=owj(_uuydd(^0di8jr)-s3+p7c-g3b%s_^g#r@^1d!+s+ahad'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # apps de terceros
    "rest_framework",
    #   swagger
    "drf_yasg",
    #   historial
    "simple_history",
    #   libreria jwt
    "rest_framework_simplejwt",
    #   lista negra de jwt tenes que migrar al instalar esta app
    "rest_framework_simplejwt.token_blacklist",
    # CORS
    "corsheaders",

    # mis apps
    "usuarios",
    "base",
    "productos",
    "gestion_gastos",
]

MIDDLEWARE = [
    # CORS
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #   agregas esto que es para reconoser el historial de cada usuario
    "simple_history.middleware.HistoryRequestMiddleware",

]

ROOT_URLCONF = 'Tienda.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Tienda.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


#   especifica un modelo de usuario personalizado
AUTH_USER_MODEL = "usuarios.Usuario"

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

# django pasa a español
LANGUAGE_CODE = 'es-es'
# cambia la zona horaria
TIME_ZONE = 'America/Montevideo'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

MEDIA_URL = "/imagenes/"
MEDIA_ROOT = os.path.join (BASE_DIR / "imagenes")

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

#   especifica un modelo de usuario personalizado
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# parte de JWT esto acticva la petision del token
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         # autenticasion global personalisada
#         #  aca va la clase que se usa para autentificar
#         # "usuarios.autentificasion_mixer.Autentificador",
#         #   este es para la libreria simple JWT
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     ],
#         # para agregarle la autentificasion de forma global
#         'DEFAULT_PERMISSION_CLASSES': (
#             'rest_framework.permissions.IsAuthenticated',
#         )
# }

# estas son configuraciones adisionales para JWT
SIMPLE_JWT = {
    #   asi le definis la vida del token de acseso
    "ACCESS_TOKEN_LIFETIME": timedelta (days = 10),
    #   asi le definis la vida del token de refrescar
    "REFRESH_TOKEN_LIFETIME": timedelta (days = 10),
    #   eso refresca el tonque de acseso y el de refrescar al mismo tiempo
    "ROTATE_REFRESH_TOKENS": True,
    #   este agrega los tokens refrescados a la lista negra
    "BLACKLIST_AFTER_ROTATION": True,
}

# verificar las credenciales de usuario y determinar si un usuario tiene acceso a la aplicación
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# aca se indica desde donde se pueden hacer peticiones al backend
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# si da error se deve agregar esoto
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# o sino esto
# CORS_ALLOWED_ORIGIN_REGEXES = [
#     r"^https://\w+\.localhost:3000$",
#     r"^https://\w+\.127.0.0.1:3000$",
# ]