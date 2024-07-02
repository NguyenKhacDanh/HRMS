document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        initialDate: '2023-09-07',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        events: function (fetchInfo, successCallback, failureCallback) {
            // Sử dụng Ajax để tải dữ liệu sự kiện
            $.ajax({
                url: '/Timekeeping/GetEvents',
                type: 'GET',
                data: {
                    // Các tham số bổ sung nếu cần
                },
                success: function (response) {
                    // Gọi hàm successCallback và truyền dữ liệu sự kiện vào
                    //successCallback(response);

                    var modifiedData = response.map(function (event) {
                        // Chuyển đổi ngày thành đối tượng ngày JavaScript
                        var newdate = new Date(parseInt((event.start).match(/\d+/)[0])).toString("yyyy-MM-dd");
                        event.start = newdate; 

                        event.title = event.title;
                        return event;
                    });

                    // Gọi hàm successCallback và truyền dữ liệu sự kiện đã chỉnh sửa vào
                    successCallback(modifiedData);
                    console.log(modifiedData);
                },
                error: function () {
                    // Gọi hàm failureCallback nếu có lỗi
                    failureCallback();
                }
            });
        },
        eventClick: function (info) {
            // Xử lý khi sự kiện được click
            // info.event chứa thông tin về sự kiện
        },
        eventColor: '#378006'
    });

    calendar.render();
});
