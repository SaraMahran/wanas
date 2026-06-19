from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Quote, Mood
from .serializers import QuoteSerializer
import random


@api_view(['GET'])
@permission_classes([AllowAny])
def random_quote(request):
    mood_id = request.query_params.get('mood', None)
    if mood_id:
        quotes = Quote.objects.filter(moods__id=mood_id)
    else:
        quotes = Quote.objects.all()
    if not quotes.exists():
        return Response({'detail': 'No quotes found'}, status=status.HTTP_404_NOT_FOUND)
    quote = random.choice(list(quotes))
    serializer = QuoteSerializer(quote)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_moods(request):
    moods = Mood.objects.all()
    from .serializers import MoodSerializer
    serializer = MoodSerializer(moods, many=True)
    return Response(serializer.data)