from django.shortcuts import render
from django.http import JsonResponse
from app.services.fipe_api_service import FipeApi


def index(request):
    return render(request, 'index.html')


def marks_json(request):
    type_of_vehicle = request.GET.get('tipo_veiculo')
    fipe_api = FipeApi()
    json_result = fipe_api.get_marks(type_of_vehicle=type_of_vehicle)
    return JsonResponse(json_result, safe=False)
