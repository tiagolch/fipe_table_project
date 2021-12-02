jQuery(document).ready(function () {
    jQuery('#tipo_veiculo').on('change', function () {
        let typeOfVehicle = this.value;

        if (typeOfVehicle === ""){
            jQuery('#marca').attr("disabled", true);
        }
        else {
            jQuery("#marca").attr("disabled", false);
        }
    });
});