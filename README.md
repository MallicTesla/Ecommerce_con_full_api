# ECommerce

## Django API

### Configurar entorno virtual

#### Instalar

Ejecutar:
```
pip install virtualenv
```

Si falla, probar con `pip3`.

#### Crear

Ejecutar:
```
python -m venv {nombre}
```

Si falla, probar con `python3`.

#### Activar

Windows PowerShell:
```
.venv\bin\Scripts\Activate.ps1
```

Windows CMD:
```
.venv\bin\Scripts\activate.bat
```

Linux/MacOSv
```
source .venv/bin/activate
```

### Instalar requerimientos

```
cd Ecommerce
pip install -r requirements.txt
```

### Aplicar migraciones

```
python manage.py migrate
```

### Ejecutar

```
python manage.py runserver
```
