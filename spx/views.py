import os
import requests
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views import View
from dotenv import find_dotenv, load_dotenv
load_dotenv()
load_dotenv(find_dotenv(), override=True)

GEX_BOT_API_KEY = os.environ.get("GEX_BOT_API_KEY")
BASE_URL = "https://api.gexbot.com/spx"

class GexBotAllFullView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/all?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)

class GexBotZeroFullView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/zero?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)


class GexBotAllMajorsView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/all/majors?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)


class GexBotZeroMajorsView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/zero/majors?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)


class GexBotAllMaxView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/all/maxchange?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)


class GexBotZeroMaxView(View):
    def get(self, request):
        url = f"{BASE_URL}/gex/zero/maxchange?key={GEX_BOT_API_KEY}"
        response = requests.get(url)
        data = response.json()
        return JsonResponse(data)


class SpxView(View):
    def get(self, request):
        context = {"api_key": GEX_BOT_API_KEY}
        return render(request, "spx.html", context)