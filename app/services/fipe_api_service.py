import requests
from enum import Enum
from requests.exceptions import HTTPError


class TypeOfVehicle(Enum):
    CARROS = 'carros'
    MOTOS = 'motos'
    CAMINHOES = 'caminhoes'


class FipeApi():

    def __init__(self):
        self.HEADERS = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Content-type': 'application/json'
        }

    def get_json_response(self, url):
        try:
            response = requests.get(url=url, headers=self.HEADERS)
            response.raise_for_status()
            json_response = response.json()
            return json_response
        except HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')
            return {'error_message': http_err}
        except Exception as err:
            print(f'Other error occurred: {err}')
            return {'error_message': err}

    def get_marks(self, type_of_vehicle):
        # carros
        # motos
        # caminhoes
        # Exemplo: https://parallelum.com.br/fipe/api/v1/carros/marcas
        url = f'https://parallelum.com.br/fipe/api/v1/{type_of_vehicle}/marcas'
        return self.get_json_response(url)

    def get_models(self, type_of_vehicle, vehicle_code):
        # Exemplo: https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos
        url = f'https://parallelum.com.br/fipe/api/v1/{type_of_vehicle}/marcas/{vehicle_code}/modelos'
        return self.get_json_response(url)

    def get_years(self, type_of_vehicle, vehicle_code, vehicle_model_code):
        # Exemplo: https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos
        url = f'https://parallelum.com.br/fipe/api/v1/{type_of_vehicle}/marcas/{vehicle_code}/modelos/{vehicle_model_code}/anos'
        return self.get_json_response(url)

    def get_value(self, type_of_vehicle, vehicle_code, vehicle_model_code, year_code):
        # Exemplo: https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos/5940/anos/2014-3
        url = f'https://parallelum.com.br/fipe/api/v1/{type_of_vehicle}/marcas/{vehicle_code}/modelos/{vehicle_model_code}/anos/{year_code}'
        return self.get_json_response(url)

