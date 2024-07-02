function CheckSalarySheetIsExist() {
    var selectedMonth = document.getElementById("SalarySheetMonth").value;

    $.ajax({
        type: "POST",
        url: "/SalarySheet/CheckSalarySheetExist",
        data: { month: selectedMonth },
        success: function (result) {
            if (result.exists) {
                alert("Bảng lương đã tồn tại trong cơ sở dữ liệu. Vui lòng chọn lại.");
                document.getElementById("SalarySheetMonth").value = "";
            }
            else if (result.NoTimeSheet) {
                alert("Vui lòng tạo bảng chấm công trước khi tạo bảng lương !!!");
                document.getElementById("SalarySheetMonth").value = "";
            }
        }
    });
}

function confirmDeleteSalarySheet(id) {
    if (confirm("Bạn có muốn xóa dữ liệu bảng lương ?")) {
        DeleteSalarySheetToDataBase(id);
    }
}


function DeleteSalarySheetToDataBase(id) {
    $.ajax({
        type: "POST",
        url: "/SalarySheet/DeleteSalarySheet?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}


