/**
 * Created by dchiu on 2/27/15.
 */

var locations = [];
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
      for (var i = 0; i < results.length; i++) {
        var imageFile = results[i].get("File");

        var imageLocation = new google.maps.LatLng(results[i].get("Latitude"),
          results[i].get("Longitude"));
        locations.push(imageLocation);

        // Put a marker in the map at the location where this image was taken.
        new google.maps.Marker({
          position: imageLocation,
          map: map
        });

        // Extend the bounds to include this location so we can place the map's viewport at the
        // right place to view all locations.
        bounds.extend(imageLocation);

        // Create a new image tag for this upload in order to display it in the page.
        var imageURL = imageFile.url();
        var imageTag = document.createElement("img");
        imageTag.src = imageURL;
        document.body.appendChild(imageTag);
      }

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