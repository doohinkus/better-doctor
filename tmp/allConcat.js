var Doctor = require('./../js/doctor.js').doctorModule;
// var getDoctors = require('./../js/doctor.js').getDoctors;




$(document).ready(function (){
  var doctor = new Doctor();
  $("#find").click(function (){
    var ailment = $("#ailment").val();
    $("#ailment").val("");
    doctor.getDoctors(ailment);
  });

});
