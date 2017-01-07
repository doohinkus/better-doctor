(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "6252af875ed52ddc7c4da510ea2437b1";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
function Doctor(){
};

Doctor.prototype.getDoctors = function (medicalIssue, displayFunction){
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      var data = result.data;
      displayFunction(medicalIssue, data);
      // console.log(data, " ", result);
    })
   .fail(function(error){
      console.log("fail");
    });
};




exports.doctorModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
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
}


$(document).ready(function (){
  var doctor = new Doctor();
  $("#find").click(function (){
    var ailment = $("#ailment").val();
    $("#ailment").val("");
    doctor.getDoctors(ailment, displayResults);
  });

});

},{"./../js/doctor.js":2}]},{},[3]);
