function CheckTimesheetIsExist() {
    var selectedMonth = document.getElementById("TimesheetMonth").value;

    $.ajax({
        type: "POST",
        url: "/Timesheets/CheckTimesheetExistence", // Thay đổi đường dẫn đến action trong controller
        data: { month: selectedMonth },
        success: function (result) {
            if (result.exists) {
                alert("Tháng đã tồn tại trong cơ sở dữ liệu. Vui lòng chọn lại.");
                document.getElementById("TimesheetMonth").value = "";
            }
            else if (result.NotShiftArrange) {
                alert("Có " + result.countEmployee + " nhân viên chưa được xếp ca trong tháng, Vui lòng xếp ca trước khi tạo bảng công!");
                document.getElementById("TimesheetMonth").value = "";
            }
        }
    });
}

function confirmDeleteTimesheet(id) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteTimeSheetToDataBase(id);
    }
}


function DeleteTimeSheetToDataBase(id) {
    $.ajax({
        type: "POST",
        url: "/Timesheets/DeleteTimeSheet?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}


