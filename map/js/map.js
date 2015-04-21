var $map;
var $latlng;
var overlay;
var circle;
function initialize() {
    var myOptions = {
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.LEFT_BOTTOM},
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        scaleControl: true,
        scaleControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        streetViewControl: true,
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        styles: [
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#2c2e33"
                    },
                    {
                        "saturation": 7
                    },
                    {
                        "lightness": 19
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-3"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f39247"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#ff6f00"
                    },
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#008eff"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f3dbc8"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#bbc0c4"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": -2
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -90
                    },
                    {
                        "lightness": -8
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": 10
                    },
                    {
                        "lightness": 69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -78
                    },
                    {
                        "lightness": 67
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            }
        ]
    };
    $map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//            var image = new google.maps.MarkerImage(
//                    'icons/pin.png',
//                    new google.maps.Size(50, 50), // size
//                    new google.maps.Point(0, 0), // origin
//                    new google.maps.Point(25, 50)	// anchor
//                    );
//            var geoMarker = new google.maps.Marker({
//                'position': pos,
//                'animation': google.maps.Animation.DROP,
////                'icon': image,
//                'zIndex': 1
//            });
            $map.setCenter(pos);
            overlay = new google.maps.OverlayView();
            overlay.draw = function () {
            };
            overlay.setMap($map);
            var clusterMarker = [];
            $.post("../CSV/grabCSVContent.php", function (data) {
                var locations = $.parseJSON(data);
                for (var i = 0; i < locations.length; i++) {
                    var loc = new google.maps.LatLng(locations[i]['latitude'], locations[i]['longitude']);
                    var image = new google.maps.MarkerImage(
                            'icons/blue_marker.png',
                            new google.maps.Size(50, 54), // size
                            new google.maps.Point(0, 0), // origin
                            new google.maps.Point(25, 54)	// anchor
                            );
//                    var sensation = {
//                        strokeColor: '#FF0000',
//                        strokeOpacity: 0.8,
//                        strokeWeight: 2,
//                        fillColor: '#FF0000',
//                        fillOpacity: 0.35,
//                        map: $map,
//                        center: loc,
//                        radius: 200
//                    };
//                    circle = new google.maps.Circle(sensation);
                    var marker = new google.maps.Marker({
                        'position': loc,
                        'animation': google.maps.Animation.DROP,
                        'icon': image
                    });
                    clusterMarker.push(marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        var latitude = this.position.lat();
                        var longitude = this.position.lng();
                        var contentString = "Latitude : " + latitude + ", Longitude : " + longitude;
                        var infoWindow = new google.maps.InfoWindow({
                            content: contentString
                        });
                        infoWindow.open($map, marker);
                    });
                }
                var mcOptions = {
                    maxZoom: 16,
                    styles: [
                        {
                            url: 'icons/cluster.png',
                            height: 64,
                            width: 64,
                            textColor: '#fff',
                            textSize: 10,
                        }
                    ]
                };
                var markerCluster = new MarkerClusterer($map, clusterMarker, mcOptions);
            });
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }

    function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
        } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
        }

        var options = {
            map: $map,
            position: new google.maps.LatLng(43.7000, -79.4000),
            content: content
        };
        var infowindow = new google.maps.InfoWindow(options);
        $map.setCenter(options.position);
    }
}
function placeMarker(location) {

    var sensation = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: $map,
        center: location,
        radius: 100
    };
    circle = new google.maps.Circle(sensation);
    var marker = new google.maps.Marker({
        position: location,
        map: $map,
        draggable: true,
        icon: 'icons/red_marker.png'
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        var latitude = this.position.lat().toFixed(6);
        var longitude = this.position.lng().toFixed(6);
        sessionStorage.setItem('latitude', latitude);
        sessionStorage.setItem('longitude', longitude);
        alert("New Location Saved");
        var sensation = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $map,
            center: new google.maps.LatLng(latitude, longitude),
            radius: 100
        };
        circle = new google.maps.Circle(sensation);
    });
    google.maps.event.addListener(marker, 'dragstart', function(){
        circle.setMap(null);
    });
    google.maps.event.addListener(marker, 'click', function () {
        var latitude = this.position.lat().toFixed(6);
        var longitude = this.position.lng().toFixed(6);
        sessionStorage.setItem('latitude', latitude);
        sessionStorage.setItem('longitude', longitude);
        alert("Location Saved");
    });
}
google.maps.event.addDomListener(window, 'load', initialize);