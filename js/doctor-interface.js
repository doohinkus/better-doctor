var Doctor = require('./../js/doctor.js').doctorModule;
// var getDoctors = require('./../js/doctor.js').getDoctors;

function displayResults(medicalIssue, result){
  $("#results").empty();

  //output html
  result.forEach(function (doctor){
    var ratings = "No ratings yet.";
    var ratingImage = "";
    var speciality = "";
    var name = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title;
    var languages = "language(s): ";
    var bio = doctor.profile.bio;
    var image = doctor.profile.image_url;
    var practices = "";
//profile result
//arrays in profile result
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
  //weird hack--first doc for toothache is always undefined, even when she appears in other results???? rest of the docotors work fine
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
      +"<p class='rating'>"
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
}


$(document).ready(function (){
  var doctor = new Doctor();
  $("#find").click(function (){
    var ailment = $("#ailment").val();
    $("#ailment").val("");
    doctor.getDoctors(ailment, displayResults);
  });

});
