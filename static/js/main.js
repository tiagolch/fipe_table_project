function clearSelectOptions(idSelect) {
    //Removendo as opções.
    jQuery(`#${idSelect} option`).remove();
    jQuery(`#${idSelect}`).selectpicker('refresh');
}

function clearAllSelectOptions() {
    clearSelectOptions('marca');
    clearSelectOptions('modelo');
    clearSelectOptions('ano');
}

function disableSelect(selectId, value) {
    jQuery(`#${selectId}`).prop('disabled', value);
    jQuery(`#${selectId}`).selectpicker('refresh');
}

function getMarks(typeOfVehicle) {

    if (typeOfVehicle === "") {
        disableSelect('marca', true);
        disableSelect('modelo', true);
        disableSelect('ano', true);
    }
    else {
        disableSelect('marca', false);
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
    if (markCode === "") {
        disableSelect('modelo', true);
        disableSelect('ano', true);
    } else {
        disableSelect('modelo', false);

        let typeOfVehicle = jQuery('#tipo_veiculo').val();
        let url = `/model_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}`;
      
        jQuery('#modelo').append(new Option("", ""));

        jQuery.get(url, function (data) {
            for (let i = 0; i < data.modelos.length; i++) {
                let item = data.modelos[i];
                jQuery('#modelo').append(new Option(item.nome, item.codigo));
            }

            jQuery('#modelo').selectpicker('refresh');
        });
    }
}

function getYears(modelCode) {
    if (modelCode === "") {
        disableSelect('ano', true);
    } else {
        disableSelect('ano', false);
        let typeOfVehicle = jQuery('#tipo_veiculo').val();
        let markCode = jQuery('#marca').val();
        let url = `/year_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}&codigo_modelo=${modelCode}`;

        jQuery('#ano').append(new Option("", ""));

        jQuery.get(url, function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                jQuery('#ano').append(new Option(item.nome, item.codigo));
            }

            jQuery('#ano').selectpicker('refresh');
        });
    }
}

function getTableRow(key, value) {
    return `<tr><th>${key}</th><td>${value}</td></tr>`;
}

function setModalTitle(marca, modelo) {
    jQuery('#staticBackdropLabel').html(`${marca} - ${modelo}`);
}

function setModalEmbedContentSrc(codigoFipe) {
    jQuery('#modal-embed-content').attr('src', `https://www.tabelafipebrasil.com/FIPE/${codigoFipe}`);
}

function getValue(yearCode) {
    let typeOfVehicle = jQuery('#tipo_veiculo').val();
    let markCode = jQuery('#marca').val();
    let modelCode = jQuery('#modelo').val();
    let url = `/value_json/?tipo_veiculo=${typeOfVehicle}&codigo_marca=${markCode}&codigo_modelo=${modelCode}&codigo_ano=${yearCode}`;

    jQuery.get(url, function (data) {
        let anoModelo = data.AnoModelo;
        let codigoFipe = data.CodigoFipe;
        let combustivel = data.Combustivel;
        let marca = data.Marca;
        let mesReferencia = data.MesReferencia;
        let modelo = data.Modelo;
        let valor = data.Valor;

        setModalTitle(marca, modelo);
        setModalEmbedContentSrc(codigoFipe);

        let html = "<div class='card'>";
        html += "<div class='card-header text-center'><h3>Informações do Veículo</h3></div>";
        html += "<div class='card-body'>"
        html += "<table class='table table-striped table-bordered'>";
        html += "<tbody>";
        html += getTableRow("Ano do Modelo", anoModelo);
        html += getTableRow("Código FIPE", `<button id='button-show-modal' data-toggle='modal' data-target='#staticBackdrop'>${codigoFipe}</button>`);
        html += getTableRow("Conbustível", combustivel);
        html += getTableRow("Marca", marca);
        html += getTableRow("Mês de Referencia", mesReferencia);
        html += getTableRow("Modelo", modelo);
        html += getTableRow("Valor", valor);
        html += "</tbody>"
        html += "</table>"
        html += "</div>"
        html += "</div'>";

        jQuery('#result').html(html);
    });
}

function clearResult() {
    jQuery('#result').html("");
}

jQuery(document).ready(function () {
    jQuery('#tipo_veiculo').on('change', function () {
        clearAllSelectOptions();
        clearResult();
        getMarks(this.value);
    });

    jQuery('#marca').on('change', function () {
        clearSelectOptions('modelo');
        clearSelectOptions('ano');
        clearResult();
        getModels(this.value);
    });

    jQuery('#modelo').on('change', function () {
        clearSelectOptions('ano');
        clearResult();
        getYears(this.value);
    });

    jQuery('#ano').on('change', function () {
        clearResult();
        getValue(this.value);
    });
});