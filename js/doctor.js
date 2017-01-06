var apiKey = require('./../.env').apiKey;
function Doctor(){
}

Doctor.prototype.getDoctors = function (medicalIssue, displayFunction){
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      var data = result.data;
      console.log(data, " ", result);
      $("#results").empty();

      //output html
      return data.forEach(function (doctor){
        var ratings = "No ratings yet.";
        var ratingImage = "";
        var speciality = "";
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
          practices += "<li>"
                    + "<h3>" + practice.name + "</h3>"
                    + "<div class='tool-tip'><span>" + practice.visit_address.street +"</span>"
                    + "<span>" + practice.visit_address.city + ", "
                    +  practice.visit_address.state + "</span>"
                    + "<span>" + practice.visit_address.zip +"</span></div>"

                    +"</li>"
        });
        //phone
        doctor.specialties.forEach(function (specialities){
          speciality += "<h3>" + specialities.actor + "</h3>";
        });
      //ratings
      doctor.ratings.forEach(function (rating){
        ratings = rating.rating;
        ratingImage = rating.image_url_small;
      });
      //weird hack--first doc for toothache is undefined???? rest of the docotors work fine
      if (ratingImage === undefined){
        ratingImage="";
      }

      
      var output =
      "<div class='doctor'>"
      +"<div class='info--personal'>"
        +"<h2>"
        +name
        +"</h2>"
        +"<img src='"+image+"''>"
        +"<div class='title'>"
          +"<p>"
          +speciality
          +"</p>"
        +"</div>"
        +"<div class='ratings'>"
          +"<img src='"+ratingImage+"'>"
          +"<span>"
            + "Rating: " + ratings
          +"</p>"
          +"<p>"
          +languages
          +"</p>"
        +"</div>"
      +"</div>"
      +"<div class='info'>"
        +"<div class='info--contact'>"
        + "<h2>"
          +"locations"
        +"</h2>"
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
};




exports.doctorModule = Doctor;
