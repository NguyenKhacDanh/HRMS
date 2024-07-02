jQuery(document).ready(function () {
    'use strict';

    $('#dtOvertime').DataTable({
        "order": [[0, "desc"]]
    });

    jQuery('#DateOvertime').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
    jQuery('#FromTime').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });
    jQuery('#ToTime').datetimepicker({
        datepicker: false,
        format: 'H:i:s',
    });

});

function validateAndCalculate() {
    var fromTimeInput = document.getElementById("FromTime");
    var toTimeInput = document.getElementById("ToTime");
    var totalHoursInput = document.getElementById("TotalHours");

    var fromTimeValue = fromTimeInput.value;
    var toTimeValue = toTimeInput.value;

    var fromTime = parseTime(fromTimeValue);
    var toTime = parseTime(toTimeValue);

    if (fromTime > toTime) {
        alert("Giờ bắt đầu không thể lớn hơn giờ kết thúc !");
        toTimeInput.value = "";
        return;
    }

    var totalHours = calculateTotalHours(fromTime, toTime);
    
    totalHoursInput.value = totalHours;
}

function parseTime(timeString) {
    var parts = timeString.split(":");
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
}

function calculateTotalHours(fromTime, toTime) {
    return (toTime - fromTime) / 60;
}


function confirmDeleteOvertime(id) {
    if (confirm("Bạn có muốn xóa dữ liệu tăng ca ?")) {
        DeleteOvertime(id);
    }
}

function DeleteOvertime(id) {
    $.ajax({
        type: "POST",
        url: "/Overtime/DeleteOvertime?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}


