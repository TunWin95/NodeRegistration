$(document).ready(function(){
      $("#regBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/register',
          success: function(data){
            $("#regDiv").html(data);
            $('#loginDiv').hide();
          }
        });
    });
    $("#loginBtn").click(function(){
        $.ajax({
          type : 'GET',
          url : '/login',
          success: function(data){
            $("#loginDiv").html(data);
            $('#regDiv').hide();
          }
        });
    });
    //=====Login Form Request=============================================
    $("#loginForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var loginData ={'name': uname,'pass':upass};
      $.ajax({
          type : 'POST',
          url : '/demo',
          data : loginData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 //=====Register Form=============================================
    $("#regForm").click(function(){
      var uname  = $("#uname").val();
      var upass = $("#upass").val();
      var ufname = $("#ufname").val();
      var ulname = $("#ulname").val();
      var ugender = $("#ugender").val();
      var umail = $("#umail").val();
      var uph = $("#uph").val();
      var isAdmin = false;
      var crDate = new Date();
      var regData ={
          'name': uname,
          'pass': upass,
          'fname': ufname,
          'lname': ulname,
          'gender': ugender,
          'mail': umail,
          'ph': uph,
          'isadmin': isAdmin,
          'crDate': crDate
        };
        $.ajax({
          type : 'POST',
          url : '/regiterToDb',
          data : regData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
    });
 //Save profile Data================================================
 $('#saveBtn').click(function(){
   var skill = $("#uskill").val();
   var profileData = {'skill':skill};
   $.ajax({
     type : 'POST',
     url : '/completeprofile',
     data : profileData,
     success : function(data){
        $("#mainDiv").html(data);
     }
   });
 });
 });