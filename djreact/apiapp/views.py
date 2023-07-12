from .models import Article, Comment, Category
from .serializers import ArticleSerializer, ArticleCreateSerializer, CommentSerializer, CategorySerializer
from rest_framework.response import Response
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

class ArticleView(viewsets.ViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def create(self, request):
        data = request.data
        serializer = ArticleCreateSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data)

    def list(self, request, cat_id):
        queryset = Article.objects.all()
        if cat_id!=0:
            queryset = queryset.filter(category__id=cat_id)
        serializer = ArticleSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        queryset = Article.objects.all()
        article = get_object_or_404(queryset, pk=pk)
        serializer = ArticleSerializer(article, many=False)
        return Response(serializer.data)

class CategoryView(viewsets.ViewSet):
    queryset = Article.objects.all()
    serializer_class = CategorySerializer

    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)

class CommentView(viewsets.ViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request):
        data = request.data
        article_id = request.POST.get('article_id')
        serializer = CommentSerializer(data=data)
        queryset = Article.objects.all()
        article = get_object_or_404(queryset, pk=article_id)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article)
        return Response(serializer.data)