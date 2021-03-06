# Generated by Django 2.2.4 on 2019-09-26 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('agency', '0002_auto_20190926_0727'),
    ]

    operations = [
        migrations.AlterField(
            model_name='agency',
            name='other_messanger',
            field=models.TextField(default='', help_text='Skype, telegram etc...', max_length=250, verbose_name='Other messangers'),
        ),
        migrations.AlterField(
            model_name='agency',
            name='phone1',
            field=models.TextField(default='', max_length=250, verbose_name='Phone 1'),
        ),
        migrations.AlterField(
            model_name='agency',
            name='phone2',
            field=models.TextField(default='', max_length=250, verbose_name='Phone 2'),
        ),
        migrations.AlterField(
            model_name='agency',
            name='skype',
            field=models.TextField(default='', max_length=250, verbose_name='Email'),
        ),
    ]
