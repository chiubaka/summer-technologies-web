/**
 * Created by dchiu on 2/27/15.
 */

var markers = [];
var infoWindows = [];
var map;

google.maps.event.addDomListener(window, "load", init);

function init() {
  initMaps();
  initParse();
}

function initParse() {
  Parse.initialize("DbJ4Q1YstTtxBKH2k6JTpFeLZfITjA39mrP2se6j",
    "E7ho5BAK8kyOIJngKmFUd98eN7v7IwdvJwfIZvyO");

  var ImageUpload = Parse.Object.extend("ImageUpload");
  var query = new Parse.Query(ImageUpload);
  query.find({
    success: function(results) {
      var bounds = new google.maps.LatLngBounds();
      var infoWindow = new google.maps.InfoWindow();
      for (var i = 0; i < results.length; i++) {
        var imageFile = results[i].get("File");

        var imageLocation = new google.maps.LatLng(results[i].get("Latitude"),
          results[i].get("Longitude"));

        // Put a marker in the map at the location where this image was taken.
        var marker = new google.maps.Marker({
          position: imageLocation,
          map: map
        });

        markers.push(marker);

        // Extend the bounds to include this location so we can place the map's viewport at the
        // right place to view all locations.
        bounds.extend(imageLocation);

        // Create a new image tag for this upload in order to display it in the page.
        var imageURL = imageFile.url();
        var imageTag = document.createElement("img");
        imageTag.src = imageURL;
        $("#image-picker").append(imageTag);

        marker.content = imageTag.cloneNode(true);

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(this.content);
          infoWindow.open(map, this);
        });
      }

      $("#image-picker img").hover(function(event) {
        var marker = markers[$(this).index()];
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }, function(event) {
        var marker = markers[$(this).index()];
        marker.setAnimation(null);
      });

      map.fitBounds(bounds);
    },
    error: function(error) {

    }
  });
}

function initMaps() {
  var center = { lat: 50, lng: 50 };
  var mapOptions = {
    center: center,
    zoom: 8
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}