# Generated by Django 2.2.4 on 2019-09-18 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('props', '0002_auto_20190918_1455'),
    ]

    operations = [
        migrations.AddField(
            model_name='value',
            name='name_en',
            field=models.CharField(help_text='Name', max_length=250, null=True, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='value',
            name='name_ru',
            field=models.CharField(help_text='Name', max_length=250, null=True, verbose_name='Name'),
        ),
    ]
