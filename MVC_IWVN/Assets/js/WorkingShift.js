jQuery(document).ready(function () {
    'use strict';

   
    jQuery('#fromTimeAM').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });
    jQuery('#toTimeAM').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });


    jQuery('#fromTimePM').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });
    jQuery('#toTimePM').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });

});