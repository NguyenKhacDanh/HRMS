

$(document).ready(function () {
    LoadDataRelationShip($("#IDEmp").val());
    var IDUpdate = 0;
});
$("body").on("click", "#btnAdd", function () {
    //Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var txtFullName = $("#RelFullname");
    var txtRelationship = $("#Relationship");
    var txtPhone = $("#RelPhone");
    var txtAddress = $("#RelAddress");
    var txtBirthday = $("#RelBirthday");
    if (!txtFullName.val() || !txtRelationship.val() || !txtAddress.val() || !txtBirthday.val()) {
        alert("Vui lòng điền đủ thông tin.");
        return;
    }

    //save to database
    SaveRelationEmployee(EmployeeID, txtFullName.val(), txtRelationship.val(), txtPhone.val(), txtAddress.val(), txtBirthday.val());

    //Clear the TextBoxes.
    txtFullName.val("");
    txtPhone.val("");
    txtAddress.val("");
    txtBirthday.val("");
    LoadDataRelationShip(EmployeeID);
});

function Remove(idRe, idEm) {
    if (confirm("Bạn có muốn xóa dữ liệu ?")) {
        DeleteToDataBase(idRe, idEm);
    }
};

function SaveRelationEmployee(EmployeeID, FullName, Relationship, Phone, Address, Birthday) {
    var relationships = new Array();
    //save to database
    var relationship = {};
    relationship.EmployeeID = EmployeeID;
    relationship.Fullname = FullName;
    relationship.Relationship = Relationship;
    relationship.Phone = Phone;
    relationship.Address = Address;
    relationship.Birthday = Birthday;
    relationships.push(relationship);
    $.ajax({
        type: "POST",
        url: "/Relationships/InsertRelationship",
        data: JSON.stringify(relationships),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            alert("Đã thêm thành công !");
        }
    });
}

function DeleteToDataBase(ID, empID) {
    var relationships = new Array();
    //save to database
    var relationship = {};
    relationship.ID = ID;
    relationships.push(relationship);

    $.ajax({
        type: "POST",
        url: "/Relationships/DeleteRelationship",
        data: JSON.stringify(relationships),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            LoadDataRelationShip(empID);
            alert("Đã xóa thành công !");
        }
    });
}

function LoadDataRelationShip(employeeID) {

    if (employeeID == null || employeeID == "") return;
    $.ajax({
        type: "GET",
        url: "/Relationships/GetAllRelationships?employeeID=" + employeeID, // Inc, // Replace this URL with the endpoint that fetches all relationship data from the server.
        dataType: "json",
        success: function (data) {
            var tBody = $("#dtRelationship > TBODY")[0];
            $(tBody).empty(); // Clear the existing table data.

            // Populate the table with the new data.
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var row = tBody.insertRow(-1);
                //Add Fullname cell.
                var cell = $(row.insertCell(-1));
                cell.html(item.Fullname);

                cell = $(row.insertCell(-1));
                cell.html(item.Relationship);


                cell = $(row.insertCell(-1));
                cell.html(item.Phone);

                cell = $(row.insertCell(-1));
                cell.html(item.Address);


                //birthday
                cell = $(row.insertCell(-1));
                cell.html(convertToDate(item.Birthday));


                //check role update , if role = false , hide button
                cell = $(row.insertCell(-1));

                const editButton = document.createElement("input");
                editButton.setAttribute("type", "button");
                editButton.setAttribute("value", "Sửa");
                editButton.setAttribute("onclick", "Edit(" + item.ID + ")");
                editButton.classList.add("btn", "btn-warning");
                cell.append(editButton);

                // Add Delete Button cell.
                const deleteButton = document.createElement("input");
                deleteButton.setAttribute("type", "button");
                deleteButton.setAttribute("value", "Xóa");
                deleteButton.setAttribute("onclick", "Remove(" + item.ID + ", " + item.EmployeeID + ")");
                deleteButton.classList.add("btn", "btn-danger");
                cell.append(deleteButton);
                


                const relationShipIDInput = document.createElement("input");
                relationShipIDInput.setAttribute("type", "text");
                relationShipIDInput.setAttribute("id", "RelationShipID");
                relationShipIDInput.setAttribute("value", item.ID);
                relationShipIDInput.style.display = "none";
                relationShipIDInput.classList.add("form-control");
                cell.append(relationShipIDInput);

            }
        }
    });
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}

function convertToDate(dateString) {
    const milliseconds = parseInt(dateString.substring(6, dateString.length - 2));
    const date = new Date(milliseconds);
    return formatDate(date);
}

function Edit(id) {
    // Hide the "Add" button and show the "Update" button
    $("#btnAdd").hide();
    $("#btnUpdate").show();

    // Find the row that matches the given ID and get the data
    const row = $(`#dtRelationship > tbody > tr > td > #RelationShipID[value='${id}']`).closest("tr");
    const fullname = row.find("td:eq(0)").text();
    const relationship = row.find("td:eq(1)").text();
    const phone = row.find("td:eq(2)").text();
    const address = row.find("td:eq(3)").text();
    const birthdayText = row.find("td:eq(4)").text();

    const birthday = new Date(birthdayText);
    // Format the date as "dd/MM/yyyy"
    const formattedBirthday = formatDate(birthday);

    IDUpdate = id;
    // Populate input fields with the data
    $("#RelFullname").val(fullname);
    $("#Relationship").val(relationship);
    $("#RelPhone").val(phone);
    $("#RelAddress").val(address);
    $("#RelBirthday").val(formattedBirthday);
}
// Event handler for the Update button click
$("body").on("click", "#btnUpdate", function () {
    // Reference the Name and Country TextBoxes.
    var EmployeeID = $("#IDEmp").val();
    var txtFullName = $("#RelFullname");
    var txtRelationship = $("#Relationship");
    var txtPhone = $("#RelPhone");
    var txtAddress = $("#RelAddress");
    var txtBirthday = $("#RelBirthday");

    // Check if any of the required fields are empty
    if (!txtFullName.val() || !txtRelationship.val() || !txtAddress.val() || !txtBirthday.val()) {
        alert("Please fill in all required fields.");
        return; // Stop the function execution if any of the fields are empty
    }

    // Get the ID of the relationship to update
    var relationshipID = $("#RelationShipID").val();

    // Update data in the database
    UpdateToDataBase(IDUpdate, EmployeeID, txtFullName.val(), txtRelationship.val(), txtPhone.val(), txtAddress.val(), txtBirthday.val());

   
    LoadDataRelationShip(EmployeeID);
    // Clear the TextBoxes.
    txtFullName.val("");
    txtPhone.val("");
    txtAddress.val("");
    txtBirthday.val("");

    // Hide the Update button and show the Add button again
    $("#btnUpdate").hide();
    $("#btnAdd").show();

    
});
function UpdateToDataBase(relationshipID, employeeID, fullName, relationship, phone, address, birthday) {
    var relationshipData = {
        ID: relationshipID,
        EmployeeID: employeeID,
        Fullname: fullName,
        Relationship: relationship,
        Phone: phone,
        Address: address,
        Birthday: birthday
    };

    $.ajax({
        type: "POST",
        url: "/Relationships/UpdateRelationship",
        data: JSON.stringify(relationshipData),
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
document.getElementById("upload").onchange = function () {
    var fileInput = this;
    if (fileInput.files.length === 0) {
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();
        img.onload = function () {
            // Resize the image using a canvas
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var maxDimension = 300; // Maximum width or height in pixels

            var width = img.width;
            var height = img.height;

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height / width) * maxDimension);
                    width = maxDimension;
                } else {
                    width = Math.round((width / height) * maxDimension);
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            // Convert the resized canvas image to a Blob
            canvas.toBlob(function (blob) {
                // Create a new FormData and append the resized image
                var formData = new FormData();
                formData.append("imageFile", blob, file.name);

                // Send the resized image to the server using AJAX
                $.ajax({
                    url: "/Employee/UploadImage",
                    type: "POST",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        // Handle the response from the server
                        $("#result").text(response);

                        // Update the image source to show the uploaded image
                        if (response === "Image uploaded successfully!") {
                            document.getElementById("output").src = window.URL.createObjectURL(blob);
                        }
                    },
                    error: function (xhr, status, error) {
                        // Handle the error if any
                        console.log("Error occurred: " + error);
                    }
                });
            }, file.type);
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
};

