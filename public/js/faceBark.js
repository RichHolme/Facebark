// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".modal");
//   var instances = M.Modal.init(elems, options);
// });
var dogPicture;
console.log("working");

// use this to add add all parks to db
// -----------------------------------------------------------------
// $.get("https://services1.arcgis.com/a7CWfuGP5ZnLYE7I/arcgis/rest/services/Wake_Parks_Public/FeatureServer/0/query?where=1%3D1&outFields=DOGPARK,GREENWAYACCESS,MULTIPURPOSEFIELD,PLAYGROUND,WALKINGTRAILS,RESTROOMS,Lat,Lon,NAME,URL,ADDRESS&outSR=4326&f=json", function(data, status) {

//   data = JSON.parse(data)
//   // console.log(data.features)
//   parks = data.features

//   var parkObject = {
//     park: parks 
//   };

//   if(parks){

//     $.post("/dataSet", parkObject).then(function(res) {

//       res.end();
//     });
//   }

// });

$(document).ready(function() {
  $(".modal").modal();
  $("select").formSelect();
});

$(document).ready(function(){
    $('.sidenav').sidenav();
  });

$("#submit").click(function() {
  event.preventDefault();

  var dogName = $("#dog-name").val();
  var dogBreed = $("#dog-breed").val();
  var dogPic = $("#picture").val();
  var gender = $("#gender").val();
  var kids = $("#kids").prop("checked");
  var otherDogs = $("#otherDogs").prop("checked");
  var dogComment = $("#dogComment").val();
  console.log(dogPic);
  if(dogPic == ''){
    dogPic = "https://i2.wp.com/blog.telus.com/wp-content/uploads/2015/03/LionPaw2.jpg"
  }

  var dogObject = {
    dogName: dogName,
    dogBreed: dogBreed,
    dogPic: dogPic,
    gender: gender,
    dogDescription: dogComment,
    otherDogs: otherDogs,
    kids: kids
  };

  console.log(dogObject);
  $.post("/api/newDog", dogObject).then(function(data) {
    console.log(data);

    res.render("dashboard");
  });

  //dogPicture = null;
});

// document.addEventListener("DOMContentLoaded", function() {
//   var elems = document.querySelectorAll(".autocomplete");
//   var instances = M.Autocomplete.init(elems, options);
// });

// Or with jQuery

// $("#dogPic").on("change", function(ev) {
//   var file = ev.target.files[0];
//   // console.log(ev.target.files[0]);
//   // console.log("Picture Upload Works");

//   var reader = new FileReader();
//   console.log(reader);
//   reader.onloadend = function(e) {
//     console.log(e.target.result);
//     dogPicture = e.target.result;
//   };
//   reader.readAsDataURL(file);
// });

$(document).ready(function() {
  var dogBreedsList = [];
  var dogObject;
  $.get("https://dog.ceo/api/breeds/list/all", function(data, status) {
    var dogObject = data.message;
    for (var key in dogObject) {
      dogObject[key] = null;
    }
    // console.log(dogObject);
    $("input.autocomplete").autocomplete({
      data: dogObject
    });
    // console.log(dogObject);
  });

  // $.get("/api/getUsersDogs", function(data) {
  //   res.render("dogs", { mydogs: data });
  //   console.log(data);
  // });
});
