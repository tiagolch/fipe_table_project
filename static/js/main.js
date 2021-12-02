jQuery(document).ready(function () {
    jQuery('#tipo_veiculo').on('change', function () {
        let typeOfVehicle = this.value;

        if (typeOfVehicle === ""){
            jQuery('#marca').prop('disabled', true);
            jQuery('#marca').selectpicker('refresh');
        }
        else {
            jQuery('#marca').prop('disabled', false);
            jQuery('#marca').selectpicker('refresh');
        }
    });
});