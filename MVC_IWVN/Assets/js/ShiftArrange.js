function CheckShiftArrangeIsExist() {
    var EmployeeID = document.getElementById("EmployeeID").value;
    var year = document.getElementById("Year").value;
    var month = document.getElementById("Month").value;

    $.ajax({
        type: "POST",
        url: "/ShiftArrange/CheckShiftArrangeExistence", // Thay đổi đường dẫn đến action trong controller
        data: { EmployeeID: EmployeeID,year : year , month : month },
        success: function (result) {
            if (!result.exists) {
                var myButton = document.getElementById("createShiftArrange");

                // Bỏ thuộc tính disabled
                myButton.removeAttribute("disabled");
            }
        }
    });
}