var apiKey = require('./../.env').apiKey;
function Doctor(){
}

Doctor.prototype.getDoctors = function (medicalIssue, displayFunction){
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      var data = result.data;
      console.log(data);
      $("#results").empty();


      data.forEach(function (doctor){

        var ratings = "No ratings yet.";
        var ratingImage = "";
        var phone = ""
        var name = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title;
        var languages = "language(s): ";
        var bio = doctor.profile.bio;
        var image = doctor.profile.image_url;
        var practices = "";

//profile data
  //arrays in profile data
      //languages
        doctor.profile.languages.forEach(function (language){
          languages += language.name + " <br />";
        });
      //practices
        doctor.practices.forEach(function (practice){
          practices += "<li>" + practice.name + "</li>";
          //phone
          practice.phones.forEach(function (phone_number){
            phone = phone_number.number;
          });
        });
      //ratings
      doctor.ratings.forEach(function (rating){
        ratings = rating.rating;
        ratingImage = rating.image_url_small;

      });

//output html
        var output =
        "<div class='doctor'>"
        +"<div class='info--personal'>"
          +"<p>"
          +name
          +"</p>"
          +"<img src='"+image+"''>"
          +"<div class='ratings'>"
            +"<img src='"+ratingImage+"'>"
            +"<p>"
              +ratings
            +"</p>"
          +"</div>"
        +"</div>"
        +"<div class='title'>"
          +"<p>"
          +phone
          +"</p>"
        +"</div>"
        +"<div class='info'>"


          +"<div class='info--contact'>"
          + "<ul>"
            +practices
          +"</ul>"
          +"</div>"
        +"</div>"
        "</div>";
        $("#results").append(output);


      });
    })
   .fail(function(error){
      console.log("fail");
    });
}


exports.doctorModule = Doctor;
