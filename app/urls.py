from django.urls import path
from app.views import index
from app.views import marks_json
from app.views import model_json
from app.views import year_json
from app.views import value_json

urlpatterns = [
    path('', index, name='index'),
    path('marks_json/', marks_json, name='marks_json'),
    path('model_json/', model_json, name='model_json'),
    path('year_json/', year_json, name='year_json'),
    path('value_json/', value_json, name='value_json'),
]