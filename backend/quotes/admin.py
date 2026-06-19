from django.contrib import admin
from .models import Quote, Mood


@admin.register(Mood)
class MoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'emoji', 'description']
    search_fields = ['name']


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['text', 'author', 'book', 'keywords', 'created_at']
    search_fields = ['text', 'author', 'book', 'keywords']
    list_filter = ['moods']
    filter_horizontal = ['moods']