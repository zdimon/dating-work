# Generated by Django 2.2.4 on 2019-09-26 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('moderation', '0002_moderationfiles'),
    ]

    operations = [
        migrations.AddField(
            model_name='moderation',
            name='data',
            field=models.TextField(default='[]'),
        ),
    ]
