jQuery(document).ready(function () {
    'use strict';

    //khai báo datatable jquery
    $('#dtAllowance').DataTable({
        "order": [[0, "desc"]],
        
        select: true
    });

    $('#allowanceDetailTable').DataTable({
        "order": [[0, "desc"]],
        select: true,
        searching: false,
        info: false
    });


    //Sự kiện khi click vào datatable , hiển thị chi tiết
    var table = $('#dtAllowance').DataTable();
    $('#dtAllowance tbody').on('click', 'tr', function () {
        var id = $(this).find("td:first").text();
        $.ajax({
            url: "/Allowance/GetAllowanceDetails",
            type: "GET",
            data: { id: id },
            dataType: "json",
            success: function (result) {
                // Xóa dữ liệu cũ trong tbody của bảng
                $("#allowanceDetailTable tbody").empty();

                // Thêm dữ liệu mới vào tbody
                result.forEach(function (detail) {
                    var newRow = "<tr><td>" + detail.AllowanceNameVN + "</td><td>" + detail.MoneyAllowance + "</td></tr>";
                    $("#allowanceDetailTable tbody").append(newRow);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });


    //open modal và load dữ liệu vào modal
    $('#dtAllowance tbody').on('click', '.edit-button', function () {
        var id = $(this).data("id");

        // Đặt dữ liệu vào modal
        $("#updateAllowance").data("id", id);

        // Đặt giá trị ID vào trường ẩn trong form
        $("#modalId").val(id);


        //Load dữ liệu nhân viên
        $.ajax({
            url: "/Employee/GetEmployeeData",
            type: "GET",
            data: { id: id },
            dataType: "json",
            success: function (employeeData) {
                $("#EmployeeCode").val(employeeData.EmployeeCode);
                $("#Fullname").val(employeeData.FirstName + ' ' + employeeData.FullName);
                $("#Department").val(employeeData.Department);
                $("#Position").val(employeeData.Position);
                $("#SalaryBasic").val(employeeData.SalaryBasic);
            },
            error: function (error) {
                console.log(error);
            }
        });


        //load dữ liệu allowance
        LoadDataAllowance(id);
    });

    $("#AllowanceCategoryID").change(function () {
        var id = $(this).val(); // Lấy giá trị ID từ dropdownlist
        if (id == null) return;
        var EmployeeID = $("#modalId").val();
        // Sử dụng AJAX để truyền ID vào controller và lấy dữ liệu Money
        $.ajax({
            url: "/AllowanceCategory/GetAllowanceDetails_ByEmployee",
            type: "GET",
            data: { id: id,EmployeeID : EmployeeID },
            dataType: "json",
            success: function (moneyData) {
                // Đặt dữ liệu vào input trong modal
                $("#modelMoney").val(moneyData.Money);
            },
            error: function (error) {
                alert("Nhân viên đã có phụ cấp này !");
                $("#AllowanceCategoryID").val("");
            }
        });
    });



    $("#updateSalaryBasic").click(function (e) {
        e.preventDefault(); // Ngăn chặn hành vi mặc định khi nhấp vào thẻ <a>

        var employeeId = $("#modalId").val();
        var salaryBasic = $("#SalaryBasic").val();

        if (!salaryBasic) {
            // Nếu SalaryBasic rỗng, làm nút updateButton không hoạt động
            $("#updateButton").attr("disabled", "disabled");
            return;
        }

        // Gửi dữ liệu đến controller bằng AJAX
        $.ajax({
            url: "/Employee/updateSalaryBasic", // Thay thế bằng URL của controller của bạn
            method: "POST", // Hoặc "GET" tùy vào phương thức bạn sử dụng
            data: {
                EmployeeId: employeeId,
                SalaryBasic: salaryBasic
            },
            success: function (response) {
                // Xử lý kết quả thành công
                alert("Cập nhật thành công!");
            },
            error: function (xhr, status, error) {
                // Xử lý lỗi
                alert("Có lỗi xảy ra trong quá trình cập nhật.");
            }
        });
    });
});


function LoadDataAllowance(id) {
    if (id == null || id == "") return;
    $.ajax({
        type: "GET",
        url: "/Allowance/GetAllowanceDetails?id=" + id, // Inc, // Replace this URL with the endpoint that fetches all relationship data from the server.
        dataType: "json",
        success: function (data) {
            var tBody = $("#dtmodalAllowance > TBODY")[0];
            $(tBody).empty(); // Clear the existing table data.

            // Populate the table with the new data.
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var row = tBody.insertRow(-1);
                //Add Fullname cell.
                var cell = $(row.insertCell(-1));
                cell.html(item.AllowanceNameVN);

                cell = $(row.insertCell(-1));
                cell.html(item.MoneyAllowance);


                //check role update , if role = false , hide button
                cell = $(row.insertCell(-1));

               
                // Add Delete Button cell.
                const deleteButton = document.createElement("input");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("value", "Xóa");
                deleteButton.setAttribute("onclick", "RemoveAllowance(" + item.id + ", " + item.EmployeeID + ")");
                deleteButton.classList.add("btn", "btn-danger");
                cell.append(deleteButton);




                const relationShipIDInput = document.createElement("input");
                relationShipIDInput.setAttribute("type", "text");
                relationShipIDInput.setAttribute("id", "AllowanceID");
                relationShipIDInput.setAttribute("value", item.id);
                relationShipIDInput.style.display = "none";
                relationShipIDInput.classList.add("form-control");
                cell.append(relationShipIDInput);

            }
        }
    });
}


function RemoveAllowance(id , empID) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteAllowance(id, empID);
    }
};

function DeleteAllowance(ID,empID) {
    var allowances = new Array();
    //save to database
    var allowance = {};
    allowance.ID = ID;
    allowances.push(allowance);

    $.ajax({
        type: "POST",
        url: "/Allowance/DeleteAllowance",
        data: JSON.stringify(allowances),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            LoadDataAllowance(empID);
            alert("Đã xóa thành công !");
        }
    });
}
$("body").on("click", "#btnAddAllowance", function () {
    //Reference the Name and Country TextBoxes.
    var EmployeeID = $("#modalId");
    var AllowanceCategoryID = $("#AllowanceCategoryID");
    
    if (!AllowanceCategoryID.val()) {
        alert("Vui lòng điền đủ thông tin.");
        return;
    }


    //save to database
    SaveToDataBase(EmployeeID.val(), AllowanceCategoryID.val());

    
    LoadDataAllowance(EmployeeID.val());
    //Clear the TextBoxes.
    AllowanceCategoryID.val("");
});

function SaveToDataBase(EmployeeID, AllowanceCategoryID) {
    var allowances = new Array();
    //save to database
    var allowance = {};
    allowance.EmployeeID = EmployeeID;
    allowance.AllowanceCategoryID = AllowanceCategoryID;
   
    allowances.push(allowance);

    $.ajax({
        type: "POST",
        url: "/Allowance/InsertAllowance",
        data: JSON.stringify(allowances),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã thêm thành công !");
        }
    });
}

