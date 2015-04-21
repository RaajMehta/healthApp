$(function () {
    $(".draggable1, .draggable2, .draggable3, .draggable4, .draggable5, .draggable6, .draggable7, .draggable8, .draggable9, .draggable10").draggable({helper: 'clone',
        stop: function (e, ui) {
            var mOffset = $($map.getDiv()).offset();
            var point = new google.maps.Point(
                    ui.offset.left - mOffset.left + (ui.helper.width() / 2),
                    ui.offset.top - mOffset.top + (ui.helper.height())
                    );
            var ll = overlay.getProjection().fromContainerPixelToLatLng(point);
            placeMarker(ll);
        }
    });
});