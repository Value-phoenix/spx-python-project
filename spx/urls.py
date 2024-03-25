from django.urls import path
from . import views

urlpatterns = [
    path("spx/", views.SpxView.as_view(), name="spx/"),
]