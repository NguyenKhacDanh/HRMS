jQuery(document).ready(function () {

    'use strict';

     //khai báo datatable jquery
    $('#dtAnnualLeave').DataTable({
        "order": [[0, "desc"]],

        select: true
    });

    $('#AnnualLeaveDetailTable').DataTable({
        "order": [[0, "desc"]],
        select: true,
        searching: false,
        info: false
    });


    //Sự kiện khi click vào datatable , hiển thị chi tiết
    var table = $('#dtAnnualLeave').DataTable();
    $('#dtAnnualLeave tbody').on('click', 'tr', function () {
        var id = $(this).find("td:first").text();
        $.ajax({
            url: "/AnnualLeave/GetAnnualLeaveDetails",
            type: "GET",
            data: { id: id },
            dataType: "json",
            success: function (result) {
                // Xóa dữ liệu cũ trong tbody của bảng
                $("#AnnualLeaveDetailTable tbody").empty();

                // Thêm dữ liệu mới vào tbody
                result.forEach(function (detail) {
                    var newRow = "<tr><td>" + detail.DateCreated + "</td><td>" + detail.TypeAction + "</td><td>" + detail.QtyAnnualLeave + "</td><td>" + detail.Detail + "</td></tr>";
                    $("#AnnualLeaveDetailTable tbody").append(newRow);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    });



});