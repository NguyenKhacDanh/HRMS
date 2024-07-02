$(document).ready(function () {
    $('#dtRoleList').DataTable({
        "order": [[0, "asc"]]
    });


    $(".role-checkbox").on("change", function () {
        var tr = $(this).closest("tr");
        var employeeId = tr.data("employeeid");
        var categoryId = tr.data("categoryid");
        var role = $(this).attr("name");
        var isChecked = $(this).is(":checked") ? 1 : 0;
       
        $.ajax({
            url: "/User/UpdateRole",
            method: "POST",
            data: {
                employeeId: employeeId,
                categoryId: categoryId,
                role: role,
                isChecked: isChecked
            },
            success: function (response) {
                // Handle success response if needed
            },
            error: function (error) {
                // Handle error if needed
            }
        });
    });
});