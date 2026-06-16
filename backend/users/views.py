from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserProfileSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({'status': 'Wanas backend is running'})


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        # Blacklist the refresh token so it can't be used again
        refresh_token = request.data['refresh']
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response({'detail': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    # Returns the current logged-in user's profile
    serializer = UserProfileSerializer(request.user.profile)
    return Response(serializer.data)