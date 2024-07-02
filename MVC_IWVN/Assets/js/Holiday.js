jQuery(document).ready(function () {
    'use strict';

    jQuery('#toDateHoliday').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' 
    });

    jQuery('#fromDateHoliday').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' 
    });
});
