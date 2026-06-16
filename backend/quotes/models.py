from django.db import models
from users.models import UserProfile


class Mood(models.Model):
    # Predefined moods users can pick from
    name = models.CharField(max_length=50, unique=True)
    emoji = models.CharField(max_length=10)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.emoji} {self.name}"


class Quote(models.Model):
    text = models.TextField()
    author = models.CharField(max_length=255)
    book = models.CharField(max_length=255, blank=True, null=True)
    moods = models.ManyToManyField(Mood, related_name='quotes')

    # Vector embedding stored as text for now, pgvector comes later
    embedding = models.JSONField(blank=True, null=True)

    added_by = models.ForeignKey(
        UserProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='quotes'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'"{self.text[:50]}" — {self.author}'