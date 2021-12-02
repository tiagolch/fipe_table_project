function clearOptions(idSelect) {
    //Removendo as opções.
    jQuery(`${idSelect} option`).remove();
    jQuery(idSelect).selectpicker('refresh');
}

jQuery(document).ready(function () {
    jQuery('#tipo_veiculo').on('change', function () {
        let typeOfVehicle = this.value;

        if (typeOfVehicle === "") {
            clearOptions('#marca');
            jQuery('#marca').prop('disabled', true);
            jQuery('#marca').selectpicker('refresh');
        }
        else {
            jQuery('#marca').prop('disabled', false);
            jQuery('#marca').selectpicker('refresh');

            let url = `/marks_json/?tipo_veiculo=${typeOfVehicle}`;

            clearOptions('#marca');

            jQuery.get(url, function (data) {
                for (let i = 0; i < data.length; i++) {
                    let item = data[i];
                    jQuery('#marca').append(new Option(item.nome, item.codigo));
                }

                jQuery('#marca').selectpicker('refresh');
            });
        }
    });
});