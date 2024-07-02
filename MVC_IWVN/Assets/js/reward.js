$(document).ready(function () {
    // Lắng nghe sự kiện thay đổi của combobox
    jQuery('#DateReward').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });
    jQuery('#ApproveDate').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    $("#EmployeeID").select2();
    $("#ApproveBy").select2();
});

function confirmDeleteReward(idReward) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteRewardToDataBase(idReward);
    }
}


function DeleteRewardToDataBase(idReward) {
    $.ajax({
        type: "POST",
        url: "/Reward/DeleteReward?id=" + idReward,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã xóa thành công !");
        }
    });
}