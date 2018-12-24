console.log("profilePark.js");
var currentPark = localStorage.getItem("currentPark");
var currentParkImg = localStorage.getItem("currentParkImg");

$(document).ready(function(username) {
  // console.log(currentPark);
  // console.log(currentParkImg)
  // console.log("clicked");
  $("#title").text("You're Going to " + currentPark + "!");
  $("#parkImg").attr('src', "./images/"+currentParkImg+"");
  // console.log(userid);
  $.get("/api/parks").then(function(dbParks) {
    // console.log(dbParks);
    for (var i = 0; i < dbParks.length; i++) {
      if (currentPark === dbParks[i].name) {
        // console.log(dbParks[i].name);
        // console.log("this one");
        let dogpark = dbParks[i].dogpark;
        if(dogpark == 1){
          $('#dogpark').attr('src', "./images/thumbsUp.jpg");
          $('#dogpark').attr('class', "thumb");
        }else{
          $('#dogpark').attr('src', "./images/thumbsDown.jpg");
          $('#dogpark').attr('class', "thumbdown");
        }
        let field = dbParks[i].field;
        if(field == 1){
          $('#fields').attr('src', "./images/thumbsUp.jpg");
          $('#fields').attr('class', "thumb");
        }else{
          $('#fields').attr('src', "./images/thumbsDown.jpg");
          $('#fields').attr('class', "thumbdown");
        }
        let greenwayAcess = dbParks[i].greenwayAcess;
        if(greenwayAcess == 1){
          $('#greenway').attr('src', "./images/thumbsUp.jpg");
          $('#greenway').attr('class', "thumb");
        }else{
          $('#greenway').attr('src', "./images/thumbsDown.jpg");
          $('#greenway').attr('class', "thumbdown");
        }
        let restrooms = dbParks[i].restrooms;
        if(restrooms == 1){
          $('#restroom').attr('src', "./images/thumbsUp.jpg");
          $('#restroom').attr('class', "thumb");
        }else{
          $('#restroom').attr('src', "./images/thumbsDown.jpg");
          $('#restroom').attr('class', "thumbdown");
        }
        // $("#parkInfo").empty();
        // var newLine = $("<h4>");
        // newLine.append("<p> Dogpark:  " + dogpark + "</p>");
        // newLine.append("<p> Open Fields:  " + field + "</p>");
        // newLine.append(
        //   "<p> Greenway Access:  " + greenwayAcess + "</p>"
        // );
        // newLine.append("<p> Restrooms:  " + restrooms + "</p>");

        // $("#parkInfo").append(newLine);
      }
    }
  });
});
