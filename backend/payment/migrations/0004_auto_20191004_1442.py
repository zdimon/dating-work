# Generated by Django 2.2.4 on 2019-10-04 14:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('payment', '0003_payment_agency'),
    ]

    operations = [
        migrations.AddField(
            model_name='payment',
            name='content_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType'),
        ),
        migrations.AddField(
            model_name='payment',
            name='object_id',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
