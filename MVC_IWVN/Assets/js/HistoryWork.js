
$(document).ready(function () {
    LoadDataHistoryWork($("#IDEmp").val());
    var IDUpdate = 0;
});

/*Education Tab*/

function LoadDataHistoryWork(employeeID) {
    if (employeeID == null || employeeID == "") return;
    $.ajax({
        type: "GET",
        url: "/HistoryWork/GetHistoryWorkByEmployee?employeeID=" + employeeID, // Inc, // Replace this URL with the endpoint that fetches all relationship data from the server.
        dataType: "json",
        success: function (data) {
            var tBody = $("#dtHistoryWork > TBODY")[0];
            $(tBody).empty(); // Clear the existing table data.

            // Populate the table with the new data.
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var row = tBody.insertRow(-1);
                //Add Fullname cell.
                var cell = $(row.insertCell(-1));
                cell.html(item.Company);

                cell = $(row.insertCell(-1));
                cell.html(item.PositionID);


                cell = $(row.insertCell(-1));
                cell.html(item.JobID);

                cell = $(row.insertCell(-1));
                cell.html(convertToDate(item.FromDate));

                //birthday
                cell = $(row.insertCell(-1));
                cell.html(convertToDate(item.ToDate));

                // Add Delete Button cell.
                cell = $(row.insertCell(-1));
                const editButton = document.createElement("input");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("value", "Sửa");
                editButton.setAttribute("onclick", "EditHistoryWork(" + item.ID + ")");
                editButton.classList.add("btn", "btn-warning");
                cell.append(editButton);


                const deleteButton = document.createElement("input");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("value", "Xóa");
                deleteButton.setAttribute("onclick", "DeleteHistoryWork(" + item.ID + ", " + item.EmployeeID + ")");
                deleteButton.classList.add("btn", "btn-danger");
                cell.append(deleteButton);

                const relationShipIDInput = document.createElement("input");
                relationShipIDInput.setAttribute("type", "text");
                relationShipIDInput.setAttribute("id", "HistoryWorkID");
                relationShipIDInput.setAttribute("value", item.ID);
                relationShipIDInput.style.display = "none";
                relationShipIDInput.classList.add("form-control");
                cell.append(relationShipIDInput);

            }
        }
    });
}

$("body").on("click", "#btnHistoryWorkAdd", function () {
    //Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var HWCompany = $("#HWCompany").val();
    var HWPosition = $("#HWPosition").val();
    var HWJobID = $("#HWJobID").val();
    var HWFromDate = $("#HWFromDate").val();
    var HWToDate = $("#HWToDate").val();
    if (!HWCompany || !HWJobID || !HWFromDate || !HWToDate || !HWPosition) {
        alert("Vui lòng điền đủ thông tin.");
        return;
    }


    //save to database
    SaveHWToDataBase(EmployeeID, HWCompany, HWPosition, HWJobID, HWFromDate, HWToDate);

    //Clear the TextBoxes.
    $("#HWCompany").val("");
    $("#HWJobID").val("");
    $("#HWFromDate").val("");
    $("#HWToDate").val("");
    LoadDataHistoryWork(EmployeeID);
});


function SaveHWToDataBase(EmployeeID, HWCompany, HWPosition, HWJobID, HWFromDate, HWToDate) {

    var hws = new Array();
    //save to database
    var hw = {};
    hw.EmployeeID = EmployeeID;
    hw.Company = HWCompany;
    hw.PositionID = HWPosition;
    hw.JobID = HWJobID;
    hw.FromDate = HWFromDate;
    hw.ToDate = HWToDate;
    hws.push(hw);

    $.ajax({
        type: "POST",
        url: "/HistoryWork/InsertHistoryWork",
        data: JSON.stringify(hws),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã thêm thành công !");
        }
    });
}
function DeleteHistoryWork(idRe, idEm) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteHistoryWorkFuntions(idRe, idEm);
    }
};

function DeleteHistoryWorkFuntions(ID, empID) {
    var hws = new Array();
    //save to database
    var hw = {};
    hw.ID = ID;
    hws.push(hw);

    $.ajax({
        type: "POST",
        url: "/HistoryWork/DeleteHistoryWork",
        data: JSON.stringify(hws),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            LoadDataHistoryWork(empID);
            alert("Đã xóa thành công !");
        }
    });
}

function EditHistoryWork(id) {
    // Hide the "Add" button and show the "Update" button
    $("#btnHistoryWorkAdd").hide();
    $("#btnUpdateHistoryWork").show();

    // Find the row that matches the given ID and get the data
    const row = $(`#dtHistoryWork > tbody > tr > td > #HistoryWorkID[value='${id}']`).closest("tr");
    const company = row.find("td:eq(0)").text();
    const positionID = row.find("td:eq(1)").text();
    const jobID = row.find("td:eq(2)").text();

    const fromdateText = row.find("td:eq(3)").text();
    const fromdate = new Date(fromdateText);
    // Format the date as "dd/MM/yyyy"
    const formattedFromDate = formatDate(fromdate);


    const todateText = row.find("td:eq(4)").text();
    const todate = new Date(todateText);
    // Format the date as "dd/MM/yyyy"
    const formattedToDate = formatDate(todate);
    IDUpdate = id;

    // Populate input fields with the data
    $("#HWCompany").val(company);
    $("#HWPosition").val(positionID);
    $("#HWJobID").val(jobID);
    $("#HWFromDate").val(formattedFromDate);
    $("#HWToDate").val(formattedToDate);
}

$("body").on("click", "#btnUpdateHistoryWork", function () {
    // Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var Company = $("#HWCompany");
    var PositionID = $("#HWPosition");
    var jobID = $("#HWJobID");
    var fromDate = $("#HWFromDate");
    var toDate = $("#HWToDate");

    // Check if any of the required fields are empty
    if (!Company.val() || !PositionID.val() || !jobID.val() || !fromDate.val() || !toDate.val()) {
        alert("Please fill in all required fields.");
        return; // Stop the function execution if any of the fields are empty
    }

    // Get the ID of the relationship to update
    var HistoryWorkID = $("#HistoryWorkID").val();

    // Update data in the database
    UpdateHistoryWork(IDUpdate, EmployeeID, Company.val(), PositionID.val(), jobID.val(), fromDate.val(), toDate.val());

    // Clear the TextBoxes.
    Company.val("");
    jobID.val("");
    fromDate.val("");
    toDate.val("");

    // Hide the Update button and show the Add button again
    $("#btnUpdateHistoryWork").hide();
    $("#btnHistoryWorkAdd").show();

    LoadDataHistoryWork(EmployeeID);
});


function UpdateHistoryWork(HistoryWorkID, employeeID, Company, PositionID, jobID, fromDate, toDate) {
    var HWData = {
        ID: HistoryWorkID,
        EmployeeID: employeeID,
        Company: Company,
        PositionID: PositionID,
        jobID: jobID,
        FromDate: fromDate,
        ToDate: toDate
    };

    $.ajax({
        type: "POST",
        url: "/HistoryWork/UpdateHistoryWork",
        data: JSON.stringify(HWData),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Cập nhật thành công!");
        },
        error: function (xhr, textStatus, error) {
            alert("Lỗi khi cập nhật dữ liệu.");
        }
    });
}