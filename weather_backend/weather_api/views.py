from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
import requests

class WeatherView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        location = request.query_params.get('location')
        weather_api_url = f'http://api.weatherapi.com/v1/current.json?key={settings.WEATHER_API_KEY}&q={location}'
        response = requests.get(weather_api_url)
        data = response.json()

        weather_data = {
            'temperature': data['current']['temp_c'],
            'humidity': data['current']['humidity']
            # Add more weather data as needed
        }
        return Response(weather_data)
