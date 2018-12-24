
$(document).ready(function() {

    $(document).on('click', '#resultsBtn', function() {
        $('html,body').animate({
            scrollTop: $("#results").offset().top},
            'slow');
    });

    var parkObj = {};
    var choiceArr = ["#dogPark", "#greenwayAcess", "#walkingTrails", "#restrooms", "#field"];

    $(document).on('click','#parkSearch', function(event){
        var picks = [];
        var holder = [];
        var distanceObj = {};
        var distance = $("#test5").val();
        var zip = $("#zipCode").val();

        distanceObj = {
            miles: distance,
            zipCode: zip
        };

        for (var i = 0; i < choiceArr.length; i++){
        
            if ($(choiceArr[i]).is(":checked"))
            {   
                $(choiceArr[i]).prop('checked', false);
            
                holder = [];
                choiceArr[i] = choiceArr[i].replace('#','');
                var choice = 1;
                holder.push(choiceArr[i], choice);
                picks.push(holder);
                choiceArr[i] = choiceArr[i].replace('','#');
            }
        }

        // console.log(picks);
        // console.log(distanceObj)
        $.post("/api/parkSearch", {data: picks, distanceObj}, function(res, err) {
            // if(err)
            // console.log(err)

            console.log('logging my data')
            console.log(res);
            let returnedData = res;
            var resultbtn = $("<button class='waves-effect waves-light btn' id='resultsBtn'>");
            resultbtn.append("Search Results");
            $("#resultBtnDiv").append(resultbtn);

            $('#results').empty();
                var dataLength = returnedData.length;

                if(dataLength > 100){
            
                    dataLength = 100;
                    
                    console.log(dataLength);
                }

                for (var i = 0; i < 15; i++) {
                    if(returnedData[i] == undefined){
                        break;
                    }
                    if (returnedData[i].distance == undefined) {
                    
                        returnedData[i].distance = distanceObj.miles;
                    }


                    if(parseInt(returnedData[i].distance) <= parseInt(distanceObj.miles)){
                        console.log(returnedData[i].distance);

                        if($("#results").text() == 'No Results Within Range'){
                            $('#results').empty();
                        }
                        
                        // console.log($("#results").text());
                        $('#searchFunctions').addClass('border');

                        var park = $("<div class='park'>")

                        var name = $("<h4 id='name"+i+"'>");
                        name.append(returnedData[i].name);

                        var address = $("<p id='address:"+i+"'>");
                        address.append("Address: " + returnedData[i].address);

                        // var dogPark = $("<li id='dogPark:"+i+"'>");
                        // dogPark.append("- DogPark: " + returnedData[i].dogpark);

                        // var restroom = $("<li id='restroom:"+i+"'>");
                        // restroom.append("- Restrooms: " + returnedData[i].restrooms);

                        // var greenway = $("<li id='greenway:"+i+"'>");
                        // greenway.append("- GreenwayAccess: " + returnedData[i].greenwayAcess);

                        // var field = $("<li id='field:"+i+"'>");
                        // field.append("- Mulitpurpose Field: " + returnedData[i].field);

                        // var trails = $("<li id='trails:"+i+"'>");
                        // trails.append("- Walking Trails: " + returnedData[i].walkingTrails);

                        // var list = $("<ul class='container'>");
                        // list.append(dogPark, restroom, greenway, field, trails);

                        var info = $("<div id='info' class=''>");
                        info.append(name, address);

                        var parkbtn = $("<button class='waves-effect waves-light btn trigger' id='"+i+"'>");
                        parkbtn.append("Go To Park");

                        var btnDiv = $("<div id='buttonDiv' class='container modal-trigger' data-target='modal1' href='#modal1'>");
                        btnDiv.append(parkbtn);

                        var spacer = $("<div id='spacer'>");
                        park.append(info, btnDiv, spacer);
                        // $("#title").append(name);
                        $("#results").append(park);
                    } else if( $('#results').is(':empty') ) {
                        $("#results").append("No Results Within Range");
                    }
                }
                // }); 
            // res.end()
        });


        // $.post('api/parkSearch', {data: picks, distanceObj}, 
        //     function(returnedData, err){
        //         if(err){
        //             console.log(err)
        //         }
        //         $('#results').empty();
        //         var dataLength = returnedData.length;

        //         if(dataLength > 100){
            
        //             dataLength = 100;
                    
        //             console.log(dataLength);
        //         }

        //         for (var i = 0; i < 15; i++) {
                
        //             if (returnedData[i].distance == undefined) {
                    
        //                 returnedData[i].distance = distanceObj.miles;
        //             }


        //             if(parseInt(returnedData[i].distance) <= parseInt(distanceObj.miles)){
        //                 console.log(returnedData[i].distance);

        //                 if($("#results").text() == 'No Results Within Range'){
        //                     $('#results').empty();
        //                 }
                        
        //                 // console.log($("#results").text());
        //                 $('#searchFunctions').addClass('border');

        //                 var park = $("<div class='park'>")

        //                 var name = $("<h4 id='name"+i+"'>");
        //                 name.append(returnedData[i].name);

        //                 var address = $("<p id='address:"+i+"'>");
        //                 address.append("Address: " + returnedData[i].address);

        //                 var dogPark = $("<li id='dogPark:"+i+"'>");
        //                 dogPark.append("- DogPark: " + returnedData[i].dogpark);

        //                 var restroom = $("<li id='restroom:"+i+"'>");
        //                 restroom.append("- Restrooms: " + returnedData[i].restrooms);

        //                 var greenway = $("<li id='greenway:"+i+"'>");
        //                 greenway.append("- GreenwayAccess: " + returnedData[i].greenwayAcess);

        //                 var field = $("<li id='field:"+i+"'>");
        //                 field.append("- Mulitpurpose Field: " + returnedData[i].field);

        //                 var trails = $("<li id='trails:"+i+"'>");
        //                 trails.append("- Walking Trails: " + returnedData[i].walkingTrails);

        //                 var list = $("<ul class='container'>");
        //                 list.append(dogPark, restroom, greenway, field, trails);

        //                 var info = $("<div id='info' class=''>");
        //                 info.append(name, address, list);

        //                 var parkbtn = $("<button class='waves-effect waves-light btn trigger' id='"+i+"'>");
        //                 parkbtn.append("Go To Park");

        //                 var btnDiv = $("<div id='buttonDiv' class='container modal-trigger' data-target='modal1' href='#modal1'>");
        //                 btnDiv.append(parkbtn);

        //                 var spacer = $("<div id='spacer'>");
        //                 park.append(info, btnDiv, spacer);
        //                 // $("#title").append(name);
        //                 $("#results").append(park);
        //             } else if( $('#results').is(':empty') ) {
        //                 $("#results").append("No Results Within Range");
        //             }
        //         }
        //     }); 
 
        });

 $(document).on('click', '#buttonDiv', function(username) {
    console.log('clicked');
    // console.log(userid);
  $.get("/api/getUsersDogs", function(req, res) {
    
    $("#dogsToTake").empty()
    for(var i = 0; i < req.length; i++){
      var dog = $("<div id='dogs'>");
      var img = $("<img id='mydog' src='"+req[i].picture+"' alt='"+req[i].name+"'>");
      dog.append(img);
      dog.append(req[i].name);
      $("#dogsToTake").append(dog);
    }
  });
});

$(document).on('click', '.trigger', function() {
   console.log('clicked');
   console.log($(this).attr('id'));
   var id = $(this).attr('id');
   // console.log($('#' + id).text());
   // console.log($('#name'+id).text());
   parkObj.name = $('#name'+id).text();
   // parkObj.address = $('#address:'+id).text();
   // parkObj.dogpark = $('#dogpark:'+id).text();
   // parkObj.restroom = $('#restroom:'+id).text();
   // parkObj.greenway = $('#greenway:'+id).text();
   // parkObj.field = $('#field:'+id).text();
   // parkObj.trails = $('#trails:'+id).text();
   console.log(parkObj);

   var isStored = localStorage.getItem("currentPark");
   console.log(isStored);
    if (isStored != null) {
        localStorage.removeItem("currentPark");
    }

    localStorage.setItem("currentPark", parkObj.name);

    var isStoredimg = localStorage.getItem("currentParkImg");
    if (isStoredimg != null) {
      localStorage.removeItem("currentParkImg");
    }
    // currentParkImg = $(this).attr('parkImg');
    // console.log(currentParkImg);
    localStorage.setItem("currentParkImg", "./park1.jpg");
});


$("#letsGo").click(function(username) {
    console.log('clicked');
  $.get("/findPark2", function(req, res) {
  });
});

});