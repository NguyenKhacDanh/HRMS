jQuery(document).ready(function () {
    
    $('#dtEmployee').DataTable({
        "order": [[0, "desc"]],
        initComplete: function () {
            this.api()
                .columns()
                .every(function () {
                    let column = this;
                    let title = column.footer().textContent;

                    // Create input element
                    let input = document.createElement('input');
                    input.placeholder = title;
                    column.footer().replaceChildren(input);

                    // Event listener for user input
                    input.addEventListener('keyup', () => {
                        if (column.search() !== this.value) {
                            column.search(input.value).draw();
                        }
                    });
                });
            
        }
    });
    $('#dtEmployee tfoot tr').appendTo('#dtEmployee thead');
});


$(document).ready(function () {
    'use strict';
    jQuery('#Birthday').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });
    jQuery('#DateStartWord').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
    jQuery('#DateCCCD').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
    jQuery('#fromDateBHYT').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
    jQuery('#toDateBHYT').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    //Tab Relationship
    jQuery('#RelBirthday').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });


    //Tab Education , Tab WorkExperience
    jQuery('#EducationFromDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });
    jQuery('#EducationToDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });

    jQuery('#HWFromDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });
    jQuery('#HWToDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d' // '9999/19/39 29:59' - digit is the maximum possible for a cell
    });

    //check employee code exist
    $("#EmployeeCode").on("change", function () {
        var employeeCode = $(this).val();

        // Use AJAX to check if the employee code already exists
        $.ajax({
            url: "/Employee/CheckEmployeeCode",
            type: "GET",
            data: { employeecode: employeeCode },
            success: function (data) {
                if (data.exists) {
                    alert("Mã nhân viên đã tồn tại , vui lòng đổi mã khác!");

                    // Set focus to the EmployeeCode textbox
                    $("#EmployeeCode").focus();
                    $("#EmployeeCode").val("");
                    // Add red border to the EmployeeCode textbox
                    $("#EmployeeCode").css("border", "1px solid red");
                } else {
                    $("#EmployeeCode").css("border", "1px solid green");
                }
            },
            error: function (error) {
                // Handle error if any
                console.log(error);
            }
        });
    });

    $('#EmployeeID').on('change', function () {
        var selectedValue = $(this).val(); // Lấy giá trị đã chọn trong combobox
        // Gửi yêu cầu Ajax đến controller để tìm thông tin nhân viên
        $.ajax({
            url: '/Employee/GetEmployeeInfo',
            type: 'GET',
            data: { employeeID: selectedValue },
            success: function (data) {

                $('#Fullname').val(data.fullName);

                $('#DepartmentID').val(data.department);

                $('#PositionID').val(data.position);

                $('#AnnualLeave').val(data.annualLeave);
            }
        });
    });

    //$('#dtEmployee').DataTable({
    //    "order": [[0, "desc"]],
    //});
});

//Upload Excel
function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' id='dataFile' name='upload' onchange='enableSubmitButton()' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
        
    );
}

function clear() {
    var input = $("#dataFile").val('');
};
$(function () {
    clear();
    bs_input_file();
});


function enableSubmitButton() {
    var fileInput = document.getElementById('dataFile');
    var submitButton = document.getElementById('submitButton');

    if (fileInput && fileInput.files.length > 0) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    var fileInput = document.getElementById('dataFile');

    if (!fileInput.files || fileInput.files.length === 0) {
        event.preventDefault(); // Prevent form submission
        alert('Vui lòng chọn một tệp trước khi upload.');
    }
});



function confirmDelete(idEmployee) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteEmployeeToDataBase(idEmployee);
    }
}

function DeleteEmployeeToDataBase(idEmployee) {
    $.ajax({
        type: "POST",
        url: "/Employee/DeleteEmployee?id=" + idEmployee,       
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}


