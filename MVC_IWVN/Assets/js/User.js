$(document).ready(function () {
    $('#dtSyslog').DataTable({
        "order": [[1, "desc"]]
    });
});

function confirmUnlockUser(idAccount) {
    if (confirm("Bạn có muốn mở khóa tài khoản được chọn ?")) {
        UnlockAccount(idAccount);
    }
}


function UnlockAccount(idAccount) {
    $.ajax({
        type: "POST",
        url: "/User/UnlockAccount?id=" + idAccount,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Mở khóa thành công !");
        }
    });
}

function confirmLockUser(idAccount) {
    if (confirm("Bạn có muốn khóa tài khoản được chọn ?")) {
        LockAccount(idAccount);
    }
}


function LockAccount(idAccount) {
    $.ajax({
        type: "POST",
        url: "/User/LockAccount?id=" + idAccount,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Khóa thành công !");
        }
    });
}

