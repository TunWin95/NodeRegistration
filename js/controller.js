var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
module.exports = (function(app){
  app.get('/', function(req,res){
    res.render('home');
  });
  app.get('/login',function(req,res){
    res.render('login');
  });
  app.get('/register',function(req,res){
    res.render('register');
  });
// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
   db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            } else if (user.name === req.body.name && user.pass === req.body.pass){
              var bool = JSON.parse(user.isadmin);
              if(!bool){
                db.collection('userskill').findOne({ name: req.body.name}, function(err, skill){
                    if(user.name === req.body.name) {
                      res.render('completeprofile',{profileData:user});
                      //console.log(skillData);
                    }
                });
              }  else {
                db.collection('userprofile').find({ isadmin : { $eq: "false" }}, { _id: 0, isadmin: 0, created_date: 0, update_date: 0}).
                toArray(function(err, result) {
                  if(err) throw err;
                  //console.log(result);
                  res.render('printUser', {userlist: result});
                });
              }                         
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
          db.close;
   });
 });
});
//Direct to Edit page=========================================================s
app.post('/edit',urlencodedParser,function(req,res){
  MongoClient.connect(url, function(err, db) {
  db.collection('userprofile').findOne({ name: req.body.name}, function(err, user) {
         if (user.name === req.body.name) {
           res.render('editprofile',{editData:user});
         }
  });
});
});
//register to DB================================================================
app.post('/regiterToDb',urlencodedParser,function(req,res){
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
 MongoClient.connect(url, function(err, db) {
  db.collection("userprofile").createIndex({ name : 1}, { unique:true }, function(err, result){
    console.log(result);
   db.collection("userprofile").insertOne(jsonObj, function(err, res) {
     if(err) throw err;
     db.close();
   });
  });
   res.render('skill',{loginData:req.body});
 })
     
  });
//Update profile to MongoDB============================================================
app.post('/updateToDb',urlencodedParser,function(req,res){
  var obj = JSON.stringify(req.body);
  var jsonObj = { $set: JSON.parse(obj) };
  MongoClient.connect(url, function(err, db) {
    db.collection('userprofile').findOne({ name: req.body.name }, function(err, user){
        if(user.name == req.body.name) {
          db.collection("userprofile").updateOne(user ,jsonObj, function(err, usr) {
            if(err) throw err;
            console.log("profile inserted");
          });
          db.close();
          res.render('completeEdit',{editData:req.body});
        }
    });
  })
      
   });
//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   //console.log("Final reg Data : "+obj);
   var jsonObj = JSON.parse(obj);
      MongoClient.connect(url, function(err, db) {
      db.collection("userskill").insertOne(jsonObj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     db.close();
      });
      });
    });
});
//Create PDF format==============================================
