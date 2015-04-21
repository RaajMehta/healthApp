$(function () {
    var x = 0;
    var y = 0;
    var banner = $("#banner");
    banner.css('backgroundPosition', x + 'px' + ' ' + y + 'px');
    window.setInterval(function () {
        banner.css("backgroundPosition", x + 'px' + ' ' + y + 'px');
        y--;
    }, 90);
    $(document).mousemove(function (event) {
        TweenLite.to($("body"),
                .5, {
                    css: {
                        backgroundPosition: "" + parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / '12') + "px, " + parseInt(event.pageX / '15') + "px " + parseInt(event.pageY / '15') + "px, " + parseInt(event.pageX / '30') + "px " + parseInt(event.pageY / '30') + "px",
                        "background-position": parseInt(event.pageX / 8) + "px " + parseInt(event.pageY / 12) + "px, " + parseInt(event.pageX / 15) + "px " + parseInt(event.pageY / 15) + "px, " + parseInt(event.pageX / 30) + "px " + parseInt(event.pageY / 30) + "px"
                    }
                })
    })
    $('#LogIn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        $.post("authentication.php", {username: username, password: password})
                .done(function (data) {
                    if (($.trim(username) == $.trim(data).match(new RegExp(username))) && ($.trim(password) == $.trim(data).match(new RegExp(password))))
                    {
                        if ($.trim(data).match(/Administrator/)) {
                            window.location = 'map/map_demo.html';
                        } else if ($.trim(data).match(/Guest/)) {
                            window.location = 'demo.html';
                        }
                    } else if ($.trim(username).length <= 0 || $.trim(password).length <= 0) {
                        alert("Please enter username and password");
                    } else {
                        alert("Please enter correct username and password");
                    }
                });
    });
});