# Generated by Django 5.0.1 on 2024-02-09 22:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0002_rename_descripción_producto_historicalproducto_descripcion_producto_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='historicalproducto',
            name='producto_agregado',
        ),
        migrations.RemoveField(
            model_name='historicalproducto',
            name='producto_comprado',
        ),
        migrations.RemoveField(
            model_name='historicalproducto',
            name='producto_modificado',
        ),
        migrations.RemoveField(
            model_name='producto',
            name='producto_agregado',
        ),
        migrations.RemoveField(
            model_name='producto',
            name='producto_comprado',
        ),
        migrations.RemoveField(
            model_name='producto',
            name='producto_modificado',
        ),
    ]
