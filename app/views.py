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


def model_json(request):
    type_of_vehicle = request.GET.get('tipo_veiculo')
    mark_code = request.GET.get('codigo_marca')
    fipe_api = FipeApi()
    json_result = fipe_api.get_models(type_of_vehicle=type_of_vehicle, mark_code=mark_code)
    return JsonResponse(json_result, safe=False)

def year_json(request):
    type_of_vehicle = request.GET.get('tipo_veiculo')
    mark_code = request.GET.get('codigo_marca')
    model_code = request.GET.get('codigo_modelo')
    fipe_api = FipeApi()
    json_result = fipe_api.get_years(type_of_vehicle=type_of_vehicle, mark_code=mark_code, model_code=model_code)
    return JsonResponse(json_result, safe=False)


def value_json(request):
    type_of_vehicle = request.GET.get('tipo_veiculo')
    mark_code = request.GET.get('codigo_marca')
    model_code = request.GET.get('codigo_modelo')
    year_code = request.GET.get('codigo_ano')
    fipe_api = FipeApi()
    json_result = fipe_api.get_value(type_of_vehicle=type_of_vehicle, mark_code=mark_code, model_code=model_code, year_code=year_code)
    return JsonResponse(json_result, safe=False)