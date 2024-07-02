$(document).ready(function () {
    LoadDataEducation($("#IDEmp").val());
    var IDUpdate = 0;
});

/*Education Tab*/

function LoadDataEducation(employeeID) {
    if (employeeID == null || employeeID == "") return;
    $.ajax({
        type: "GET",
        url: "/Education/GetEducationByEmployee?employeeID=" + employeeID, // Inc, // Replace this URL with the endpoint that fetches all relationship data from the server.
        dataType: "json",
        success: function (data) {
            var tBody = $("#dtEducation > TBODY")[0];
            $(tBody).empty(); // Clear the existing table data.

            // Populate the table with the new data.
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var row = tBody.insertRow(-1);
                //Add Fullname cell.
                var cell = $(row.insertCell(-1));
                cell.html(item.School);

                cell = $(row.insertCell(-1));
                cell.html(item.DegreeID);


                cell = $(row.insertCell(-1));
                cell.html(item.Majors);

                cell = $(row.insertCell(-1));
                cell.html(convertToDate(item.FromDate));


                //birthday
                cell = $(row.insertCell(-1));
                cell.html(convertToDate(item.ToDate));



                // Add Delete Button cell.
                cell = $(row.insertCell(-1));


                // Edit Button
                const editButton = document.createElement("input");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("value", "Sửa");
                editButton.setAttribute("onclick", "EditEducation(" + item.ID + ")");
                editButton.classList.add("btn", "btn-warning");
                cell.append(editButton);


                const deleteButton = document.createElement("input");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("value", "Xóa");
                deleteButton.setAttribute("onclick", "DeleteEducation(" + item.ID + ", " + item.EmployeeID + ")");
                deleteButton.classList.add("btn", "btn-danger");
                cell.append(deleteButton);

                const relationShipIDInput = document.createElement("input");
                relationShipIDInput.setAttribute("type", "text");
                relationShipIDInput.setAttribute("id", "EducationID");
                relationShipIDInput.setAttribute("value", item.ID);
                relationShipIDInput.style.display = "none";
                relationShipIDInput.classList.add("form-control");
                cell.append(relationShipIDInput);

            }
        }
    });
}

$("body").on("click", "#btnEducationAdd", function () {
    //Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var txtEducationSchool = $("#EducationSchool").val();
    var txtEducationDegree = $("#EducationDegree").val();
    var txtEducationMajors = $("#EducationMajors").val();
    var EducationFromDate = $("#EducationFromDate").val();
    var EducationToDate = $("#EducationToDate").val();
    if (!txtEducationSchool || !txtEducationDegree || !txtEducationMajors || !EducationFromDate || !EducationToDate) {
        alert("Vui lòng điền đủ thông tin.");
        return;
    }


    //save to database
    SaveEducationToDataBase(EmployeeID, txtEducationSchool, txtEducationDegree, txtEducationMajors, EducationFromDate, EducationToDate);

    //Clear the TextBoxes.
    $("#EducationSchool").val("");
    $("#EducationMajors").val("");
    $("#EducationFromDate").val("");
    $("#EducationToDate").val("");
    LoadDataEducation(EmployeeID);
});


function SaveEducationToDataBase(EmployeeID, txtEducationSchool, txtEducationDegree, txtEducationMajors, EducationFromDate, EducationToDate) {

    var educations = new Array();
    //save to database
    var education = {};
    education.EmployeeID = EmployeeID;
    education.School = txtEducationSchool;
    education.DegreeID = txtEducationDegree;
    education.Majors = txtEducationMajors;
    education.FromDate = EducationFromDate;
    education.ToDate = EducationToDate;
    educations.push(education);

    $.ajax({
        type: "POST",
        url: "/Education/InsertEducation",
        data: JSON.stringify(educations),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã thêm thành công !");
        }
    });
}
function DeleteEducation(idRe, idEm) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteEducationFuntions(idRe, idEm);
    }
};

function DeleteEducationFuntions(ID, empID) {
    var educations = new Array();
    //save to database
    var education = {};
    education.ID = ID;
    educations.push(education);

    $.ajax({
        type: "POST",
        url: "/Education/DeleteEducation",
        data: JSON.stringify(educations),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            LoadDataEducation(empID);
            alert("Đã xóa thành công !");
        }
    });
}

function EditEducation(id) {
    // Hide the "Add" button and show the "Update" button
    $("#btnEducationAdd").hide();
    $("#btnUpdateEducation").show();

    // Find the row that matches the given ID and get the data
    const row = $(`#dtEducation > tbody > tr > td > #EducationID[value='${id}']`).closest("tr");
    const school = row.find("td:eq(0)").text();
    const degree = row.find("td:eq(1)").text();
    const majors = row.find("td:eq(2)").text();

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
    $("#EducationSchool").val(school);
    $("#EducationDegree").val(degree);
    $("#EducationMajors").val(majors);
    $("#EducationFromDate").val(formattedFromDate);
    $("#EducationToDate").val(formattedToDate);
}

$("body").on("click", "#btnUpdateEducation", function () {
    // Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var School = $("#EducationSchool");
    var Degree = $("#EducationDegree");
    var Majors = $("#EducationMajors");
    var fromDate = $("#EducationFromDate");
    var toDate = $("#EducationToDate");

    // Check if any of the required fields are empty
    if (!School.val() || !Majors.val() || !Majors.val() || !fromDate.val() || !toDate.val()) {
        alert("Please fill in all required fields.");
        return; // Stop the function execution if any of the fields are empty
    }

    // Get the ID of the relationship to update
    var EducationID = $("#EducationID").val();

    // Update data in the database
    UpdateEducation(IDUpdate, EmployeeID, School.val(), Degree.val(), Majors.val(), fromDate.val(), toDate.val());

    // Clear the TextBoxes.
    School.val("");
    Majors.val("");
    fromDate.val("");
    toDate.val("");

    // Hide the Update button and show the Add button again
    $("#btnUpdateEducation").hide();
    $("#btnEducationAdd").show();

    LoadDataEducation(EmployeeID);
});


function UpdateEducation(EducationID, employeeID, School, Degree, Majors, fromDate, toDate) {
    var educationData = {
        ID: EducationID,
        EmployeeID: employeeID,
        School: School,
        DegreeID: Degree,
        Majors: Majors,
        FromDate: fromDate,
        ToDate: toDate
    };

    $.ajax({
        type: "POST",
        url: "/Education/UpdateEducation",
        data: JSON.stringify(educationData),
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