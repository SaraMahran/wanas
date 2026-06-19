from rest_framework import serializers
from .models import Quote, Mood


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = ['id', 'name', 'emoji']


class QuoteSerializer(serializers.ModelSerializer):
    moods = MoodSerializer(many=True, read_only=True)

    class Meta:
        model = Quote
        fields = ['id', 'text', 'author', 'book', 'moods', 'keywords', 'created_at']