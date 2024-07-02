jQuery(document).ready(function () {
    'use strict';

    jQuery('#fromDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    jQuery('#toDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
});

function validateDates() {
    var fromDateInput = document.getElementById("fromDate");
    var toDateInput = document.getElementById("toDate");

    var fromDate = new Date(fromDateInput.value);
    var toDate = new Date(toDateInput.value);
    
    if (toDate < fromDate) {
        alert("Ngày bắt đầu không thể nhỏ hơn ngày kết thúc.");
        toDateInput.value = "";
    } else {
        var totalDays = calculateTotalDays(fromDate, toDate);
        var totalDaysInput = document.getElementById("totalDay");
        totalDaysInput.value = totalDays;

        //var totalHours = calculateTotalHours(fromDate, toDate);
        var totalHours = totalDays * 8;
        var totalHoursInput = document.getElementById("totalHours");
        totalHoursInput.value = totalHours;
    }
}
function calculateTotalDays(startDate, endDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    var daysDiff = Math.round((endDate - startDate) / oneDay) + 1; // Add 1 to include both start and end dates

    var totalDays = 0;
    for (var i = 0; i < daysDiff; i++) {
        var currentDate = new Date(startDate.getTime() + i * oneDay);
        // Check if the current day is not a Sunday (0), not a holiday, and not a half-day off
        if (currentDate.getDay() !== 0 && !isHoliday(currentDate)) {
            if (isMorningOff(currentDate)) {
                totalDays += 0.5; // Morning off
            } else {
                totalDays += 1; // Full day
            }
        }
    }
    return totalDays;
}

function calculateTotalHours(startDate, endDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    var daysDiff = Math.round((endDate - startDate) / oneDay) + 1; // Add 1 to include both start and end dates

    var totalHours = 0;
    for (var i = 0; i < daysDiff; i++) {
        var currentDate = new Date(startDate.getTime() + i * oneDay);
        // Check if the current day is not a Sunday (0), not a holiday, and not a half-day off
        if (currentDate.getDay() !== 0 && !isHoliday(currentDate)) {
            if (isMorningOff(currentDate)) {
                totalHours += 4; // Morning off (8 AM - 12 PM)
            } else {
                totalHours += 8; // Full day (8 AM - 5 PM)
            }
        }
    }
    return totalHours;
}

function isHoliday(date) {
    // Implement your holiday checking logic here
    // Return true if the given date is a holiday, otherwise return false
}

function isMorningOff(date) {
    var morningStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0); // 8:00 AM
    var morningEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0); // 12:00 PM

    var afternoonStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 45); // 12:45 PM
    var afternoonEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 30); // 4:30 PM

    if ((date >= morningStart && date <= morningEnd) || (date >= afternoonStart && date <= afternoonEnd)) {
        return true;
    }
    return false;
}


function confirmDeleteLeave(id) {
    if (confirm("Bạn có muốn xóa dữ liệu tăng ca ?")) {
        DeleteLeave(id);
    }
}

function DeleteLeave(id) {
    $.ajax({
        type: "POST",
        url: "/Leave/DeleteLeave?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}