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
    //=====Edit Form Request=============================================
    $("#editProfile").click(function(){
      var name = $("#pname").text();
      var editUser = {'name': name};
      $.ajax({
        type : 'POST',
        url : '/edit',
        data: editUser,
        success: function(data){
          $("#mainDiv").html(data);
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
      var email_regex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      var phone_regex = /^[09\-][0-9]{9}$/;
      var name_regex = /^[a-zA-Z]+$/i;
      var gender_regex = /^[MG]$/;

      if(
        $("#uname").val().trim() == '' ||
        $("#upass").val().trim() == '' ||
        (($("#ufname").val().trim() == '') && !($("#ufname").val().match(name_regex))) ||
        (($("#ulname").val().trim() == '') && !($("#ulname").val().match(name_regex))) ||
        (($("#ugender").val().trim() == '') && !($("#ugender").val().match(gender_regex))) ||
        (($("#umail").val().trim() == '') && !($("#umail").val().match(email_regex))) 
      ){
        alert('Fields can not be empty and must be in correct format');
        $("#ufname").val() = '';
        $("#ulname").val() = '';
        $("#ugender").val() = '';
        $("#umail").val() = '';
        $("#uph").val() = '';
      } else {     
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
          'first_name': ufname,
          'last_name': ulname,
          'gender': ugender,
          'mail': umail,
          'phone': uph,
          'isadmin': isAdmin,
          'created_date': crDate
        };
        $.ajax({
          type : 'POST',
          url : '/regiterToDb',
          data : regData,
          success: function(data){
          $("#mainDiv").html(data);
          }
        });
      }

    });
  //=====Update Form========================================
  $("#updateVal").click(function(){
    var email_regex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/i;
    var name_regex = /^[a-zA-Z]+$/i;
    var gender_regex = /^[MF]$/;
    if(
      $("#upass").val().trim() == '' ||
      (($("#ufname").val().trim() == '') && !($("#ufname").val().match(name_regex))) ||
      (($("#ulname").val().trim() == '') && !($("#ulname").val().match(name_regex))) ||
      (($("#ugender").val().trim() == '') && !($("#ugender").val().match(gender_regex))) ||
      (($("#umail").val().trim() == '') && !($("#umail").val().match(email_regex)))
    ){
      alert('Fields can not be empty and must be in correct format');
      $("#ufname").val() = '';
      $("#ulname").val() = '';
      $("#ugender").val() = '';
      $("#umail").val() = '';
    } else {     
      var uname  = $("#edname").text();
      var upass = $("#upass").val();
      var ufname = $("#ufname").val();
      var ulname = $("#ulname").val();
      var ugender = $("#ugender").val();
      var umail = $("#umail").val();
      var updateDate = new Date();

    var updateData ={
        'name': uname,
        'pass': upass,
        'first_name': ufname,
        'last_name': ulname,
        'gender': ugender,
        'mail': umail,
        'update_date': updateDate
      };
      $.ajax({
        type : 'POST',
        url : '/updateToDb',
        data : updateData,
        success: function(data){
        $("#mainDiv").html(data);
        }
      });
    }
  });
 //Save profile Data================================================
 $('#saveBtn').click(function(){
   var skill = $("#uskill").val();
   var crDate = new Date();
   var urName = $("#urname").text();
   var profileData = {'skill':skill, 'created_date':crDate, 'name': urName};
   $.ajax({
     type : 'POST',
     url : '/completeprofile',
     data : profileData,
     success : function(data){
        $("#mainDiv").html(data);
     }
   });
   $("#uskill").val('').focus();   
 });
 });