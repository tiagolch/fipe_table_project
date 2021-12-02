from django.urls import path
from app.views import index
from app.views import marks_json

urlpatterns = [
    path('', index, name='index'),
    path('marks_json/', marks_json, name='marks_json'),
]