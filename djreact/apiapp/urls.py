from django.urls import path
from .views import *

urlpatterns = [
    path('article-create', ArticleView.as_view({'post': 'create'})),
    path('article-list/<int:cat_id>', ArticleView.as_view({'get': 'list'})),
    path('article-retrieve/<int:pk>', ArticleView.as_view({'get': 'retrieve'})),
    path('create-comment', CommentView.as_view({'post': 'create'})),
    path('get-cats', CategoryView.as_view({'get': 'list'})),
]