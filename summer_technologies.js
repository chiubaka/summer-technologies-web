/**
 * Created by dchiu on 2/27/15.
 */
Parse.initialize("DbJ4Q1YstTtxBKH2k6JTpFeLZfITjA39mrP2se6j",
  "E7ho5BAK8kyOIJngKmFUd98eN7v7IwdvJwfIZvyO");

var ImageUpload = Parse.Object.extend("ImageUpload");
var query = new Parse.Query(ImageUpload);
query.find({
  success: function(results) {
    for (var i = 0; i < results.length; i++) {
      var imageFile = results[i].get("ImageFile");
      var imageURL = imageFile.url();
      var imageTag = document.createElement("img");
      imageTag.src = imageURL;
      document.body.appendChild(imageTag);
    }
  },
  error: function(error) {

  }
});