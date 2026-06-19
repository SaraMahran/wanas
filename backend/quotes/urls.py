from django.urls import path
from . import views

urlpatterns = [
    path('random/', views.random_quote, name='random_quote'),
    path('moods/', views.list_moods, name='list_moods'),
]