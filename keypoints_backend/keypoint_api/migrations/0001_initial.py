# Generated by Django 3.0.7 on 2020-07-16 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='KeyPoints',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('xPoint', models.CharField(default='', max_length=100)),
                ('yPoint', models.CharField(default='', max_length=100)),
            ],
        ),
    ]
