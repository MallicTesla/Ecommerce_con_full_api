# Generated by Django 5.0.1 on 2024-03-10 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_remove_historicalproducto_producto_agregado_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalproducto',
            name='imagen_producto',
            field=models.TextField(blank=True, max_length=100, null=True, verbose_name='Imagen del producto'),
        ),
        migrations.AddField(
            model_name='producto',
            name='imagen_producto',
            field=models.ImageField(blank=True, null=True, upload_to='productos_imagen/', verbose_name='Imagen del producto'),
        ),
    ]
