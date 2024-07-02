$(document).ready(function () {
    'use strict';
    jQuery('#DateDiscipline').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });

    jQuery('#ApproveDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });
});

function confirmDeleteDiscipline(idDiscipline) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteDisciplineToDataBase(idDiscipline);
    }
}


function DeleteDisciplineToDataBase(idDiscipline) {
    $.ajax({
        type: "POST",
        url: "/Discipline/DeleteDiscipline?id=" + idDiscipline,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}