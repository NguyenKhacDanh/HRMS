$(document).ready(function () {
    jQuery('#DateStart').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    jQuery('#DateEnd').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    jQuery('#DateSign').datetimepicker({
        timepicker: false,
        format: 'Y/m/d',
    });

    // Lắng nghe sự kiện thay đổi của combobox
    $('#CompanyID').on('change', function () {
        var selectedValue = $(this).val(); // Lấy giá trị đã chọn trong combobox
        // Gửi yêu cầu Ajax đến controller để tìm thông tin nhân viên
        $.ajax({
            url: '/Company/GetCompanyInfo',
            type: 'GET',
            data: { companyID: selectedValue },
            success: function (data) {
                // Cập nhật giá trị cho textbox tên nhân viên
                $('#phoneCompany').val(data.phone);

                // Cập nhật giá trị cho textbox phòng ban
                $('#addressCompany').val(data.address);
                $('#deputyCompany').val(data.deputy);
                $('#positionDeputyCompany').val(data.title);
                $('#taxCompany').val(data.tax);
            }
        });
    });

    $('#TypeContractID').on('change', function () {
        var selectedValue = $(this).val(); // Lấy giá trị đã chọn trong combobox
        // Gửi yêu cầu Ajax đến controller để tìm thông tin nhân viên
        $.ajax({
            url: '/TypeContract/GetTypeContractInfo',
            type: 'GET',
            data: { typeContractID: selectedValue },
            success: function (data) {
                // Cập nhật giá trị cho textbox tên nhân viên
                if (data.duration != "0")
                    $('#QtyMonth').val(data.duration);
                else $('#QtyMonth').val("Vô thời hạn");
            }
        });
    });

});