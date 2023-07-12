from rest_framework import serializers
from .models import Article, Comment, Category

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'author_name', 'text', 'created_at')

class ArticleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'description', 'text', 'created_at', 'cover')

class ArticleSerializer(serializers.HyperlinkedModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'title', 'description', 'text', 'created_at', 'comment', 'cover')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')
