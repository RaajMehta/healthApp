$(function () {
    $("#example").popover({title: 'Twitter Bootstrap Popover', content: "It's so simple to create a tooltop for my website!"});
    $(".target, .movable").draggable({
        connectWith: ".connected"
    });
    $("#save").click(function (e) {
        e.preventDefault()
        $('#message').html('<div class="alert alert-success fade in"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button>This is a success message</div>');
    });
});