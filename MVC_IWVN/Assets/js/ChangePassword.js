$(document).ready(function () {
    $('#modalChangePassword').on('click', '.btn-info', function () {
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();


        // Kiểm tra độ dài mật khẩu mới
        if (oldPassword.length <= 0) {
            alert('Mật khẩu cũ không đúng !.');
            return;
        }

        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 4) {
            alert('Mật khẩu mới phải có ít nhất 4 kí tự.');
            return;
        }

        // Kiểm tra mật khẩu mới trùng khớp với xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới không trùng khớp với xác nhận mật khẩu.');
            return;
        }

       

        // Thực hiện lưu mật khẩu mới
        $.ajax({
            type: "POST",
            url: "/Home/ChangePasswordAction",
            data: { oldPassword: oldPassword, newPassword: newPassword },
            success: function (data) {
                alert(data.message);
                window.location.href = '/Home/LogOut/';
                //displayResult(data.message, data.success ? 'alert-success' : 'alert-danger');
            },
            error: function () {
                displayResult('Đã xảy ra lỗi trong quá trình gửi yêu cầu.', 'alert-danger');
            }
        });
    });

    function displayResult(message, cssClass) {
        var resultMessage = $('#resultMessage');
        resultMessage.text(message);
        resultMessage.removeClass().addClass('alert').addClass(cssClass).show();
    }

});


$(document).on("click", ".open-AddBookDialog", function () {
    var userId = $(this).data('userid');
    document.getElementById("resetPassword").value = "";
    $('#userIdInput').val(userId);
});

$('#modalResetPassword').on('click', '.btn-info', function () {
    var userId = $('#userIdInput').val();
    var newPass = $('#resetPassword').val();

    $.ajax({
        type: 'POST',
        url: '/User/ChangePassword', 
        data: { userId: userId, newPass: newPass },
        success: function (data) {
            alert(data.message);
            $('#modalResetPassword').modal('hide');
        },
        error: function () {
            // Xử lý lỗi
        }
    });
});

$("#old-password-field").click(function () {
    var input = document.getElementById("oldPassword");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
});


$("#new-password-field").click(function () {
    var input = document.getElementById("newPassword");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
});

$("#confirm-password-field").click(function () {
    var input = document.getElementById("confirmPassword");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
});

$("#reset-password-field").click(function () {
    var input = document.getElementById("resetPassword");
    $(this).toggleClass("fa-eye fa-eye-slash");
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
});


