function clearOptions(idSelect) {
    //Removendo as opções.
    jQuery(`${idSelect} option`).remove();
    jQuery(idSelect).selectpicker('refresh');
}

function clearAllSelectOptions() {
    clearOptions('#marca');
    clearOptions('#modelo');
    clearOptions('#ano');
}

function getMarks(typeOfVehicle) {

    if (typeOfVehicle === "") {
        jQuery('#marca').prop('disabled', true);
        jQuery('#marca').selectpicker('refresh');
    }
    else {
        jQuery('#marca').prop('disabled', false);
        jQuery('#marca').selectpicker('refresh');

        let url = `/marks_json/?tipo_veiculo=${typeOfVehicle}`;

        jQuery('#marca').append(new Option("", ""));

        jQuery.get(url, function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                jQuery('#marca').append(new Option(item.nome, item.codigo));
            }

            jQuery('#marca').selectpicker('refresh');
        });
    }
}

function getModels(markCode) {
    let typeOfVehicle = jQuery('#tipo_veiculo').val();

    let url = `/model_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}`;

    jQuery('#modelo').prop('disabled', false);
    jQuery('#modelo').selectpicker('refresh');

    jQuery('#modelo').append(new Option("", ""));

    jQuery.get(url, function (data) {
        for (let i = 0; i < data.modelos.length; i++) {
            let item = data.modelos[i];
            jQuery('#modelo').append(new Option(item.nome, item.codigo));
        }

        jQuery('#modelo').selectpicker('refresh');
    });
}

function getYears(modelCode) {
    let typeOfVehicle = jQuery('#tipo_veiculo').val();
    let markCode = jQuery('#marca').val();

    let url = `/year_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}&codigo_modelo=${modelCode}`;

    jQuery('#ano').prop('disabled', false);
    jQuery('#ano').selectpicker('refresh');

    jQuery('#ano').append(new Option("", ""));

    jQuery.get(url, function (data) {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            jQuery('#ano').append(new Option(item.nome, item.codigo));
        }

        jQuery('#ano').selectpicker('refresh');
    });
}

function getTableRow(key, value) {
    return `<tr><th>${key}</ht><td>${value}<td></tr>`;
}

function getValue(yearCode) {
    let typeOfVehicle = jQuery('#tipo_veiculo').val();
    let markCode = jQuery('#marca').val();
    let modelCode = jQuery('#modelo').val();

    let url = `/value_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}&codigo_modelo=${modelCode}&codigo_ano=${yearCode}`;

    jQuery.get(url, function (data) {
        console.log(data);

        let anoModelo = data.AnoModelo;
        let codigoFipe = data.CodigoFipe;
        let combustivel = data.Combustivel;
        let marca = data.Marca;
        let mesReferencia = data.MesReferencia;
        let modelo = data.Modelo;
        let valor = data.Valor; 
        
        let html = "<div class='card'>";
        html += "<div class='card-header text-center'><h3>Informações do Veículo</h3></div>";
        html += "<div class='card-body'>"
        html += "<table class='table table-striped'>";
        html += "<tbody>";
        html += getTableRow("Ano do Modelo", anoModelo);
        html += getTableRow("Código FIPE", codigoFipe);
        html += getTableRow("Conbustível", combustivel);
        html += getTableRow("Marca", marca);
        html += getTableRow("Mês de Referencia", mesReferencia);
        html += getTableRow("Modelo", modelo);
        html += getTableRow("Valor", valor);
        html += "</tbody>"
        html += "</table>"
        html += "</div>"
        html += "</div'>";

        console.log(html);

        jQuery('#result').html(html);
    });
}

jQuery(document).ready(function () {
    jQuery('#tipo_veiculo').on('change', function () {
        clearAllSelectOptions();
        getMarks(this.value);
    });

    jQuery('#marca').on('change', function () {
        clearOptions('#modelo');
        getModels(this.value);
    });

    jQuery('#modelo').on('change', function () {
        clearOptions('#ano');
        getYears(this.value);
    });

    jQuery('#ano').on('change', function () {
        jQuery('#result').html("");
        getValue(this.value);
    });
});