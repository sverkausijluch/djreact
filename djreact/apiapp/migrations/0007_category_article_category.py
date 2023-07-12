# Generated by Django 4.2.3 on 2023-07-12 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0006_article_cover'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='category',
            field=models.ManyToManyField(to='apiapp.category'),
        ),
    ]
